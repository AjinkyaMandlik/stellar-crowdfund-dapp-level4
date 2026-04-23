import { useState, useEffect } from 'react';
import { rpc, xdr, scValToNative } from '@stellar/stellar-sdk';
import { RPC_URL, CONTRACT_ID } from '../services/stellar';

const server = new rpc.Server(RPC_URL);
const CACHE_KEY = 'stellar_crowdfund_cache';

export function useEvents() {
  const [totalFunds, setTotalFunds] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? BigInt(JSON.parse(cached).totalFunds) : 0n;
  });
  
  const [donors, setDonors] = useState(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    return cached ? JSON.parse(cached).donors : [];
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId;

    const fetchEvents = async () => {
      if (!CONTRACT_ID) return;
      try {
        const net = await server.getLatestLedger();
        
        const response = await server.getEvents({
          startLedger: Math.max(1, net.sequence - 10000), // Check more ledgers for production
          filters: [ { type: "contract", contractIds: [CONTRACT_ID] } ]
        });

        if (response.events) {
          let localTotal = 0n;
          const donorMap = new Map();

          const parseXdr = (v) => {
              if (typeof v === 'string') return xdr.ScVal.fromXDR(v, 'base64');
              if (v && v.xdr) return xdr.ScVal.fromXDR(v.xdr, 'base64');
              return v;
          };

          response.events.forEach(ev => {
             const topics = ev.topic.map(parseXdr);
             const data = parseXdr(ev.value);
             
             const topicName = scValToNative(topics[0]);
             if (topicName === 'Donate') {
                const donor = scValToNative(topics[1]);
                const amount = scValToNative(data);
                
                localTotal += BigInt(amount);
                
                const currentDonated = donorMap.get(donor) || 0n;
                donorMap.set(donor, currentDonated + BigInt(amount));
             }
          });
          
          const sortedDonors = Array.from(donorMap.entries())
              .map(([address, amount]) => ({ address, amount: Number(amount) / 10000000 }))
              .sort((a, b) => b.amount - a.amount);
              
          setTotalFunds(localTotal);
          setDonors(sortedDonors);

          // Update cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            totalFunds: localTotal.toString(),
            donors: sortedDonors,
            timestamp: Date.now()
          }));
        }
      } catch (e) {
        console.error("Event poll error", e);
      } finally {
        setIsLoading(false);
      }
      
      timeoutId = setTimeout(fetchEvents, 5000); // Polling every 5s for production efficiency
    };

    fetchEvents();
    return () => clearTimeout(timeoutId);
  }, []);

  return { totalFunds, donors, isLoading };
}
