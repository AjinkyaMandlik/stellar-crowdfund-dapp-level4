import { useState, useCallback, useEffect } from 'react';
import { StellarWalletsKit, Networks } from '@creit.tech/stellar-wallets-kit';
import { defaultModules } from '@creit.tech/stellar-wallets-kit/modules/utils';
import { Horizon, rpc, Contract, Address, nativeToScVal, TransactionBuilder, scValToBigInt } from '@stellar/stellar-sdk';
import { HORIZON_URL, RPC_URL, TOKEN_CONTRACT_ID } from '../services/stellar';

const horizonServer = new Horizon.Server(HORIZON_URL);
const sorobanServer = new rpc.Server(RPC_URL);

export function useWallet() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      StellarWalletsKit.init({
        network: Networks.TESTNET,
        modules: defaultModules()
      });
    } catch (e) {
      console.warn("SWK already configured", e);
    }
  }, []);

  const fetchBalance = useCallback(async (addr) => {
    if (!addr) return;
    try {
      if (!TOKEN_CONTRACT_ID) return;
      const contract = new Contract(TOKEN_CONTRACT_ID);
      const param_id = new Address(addr).toScVal();
      
      // We simulate a transaction to call "balance" to read state
      const account = await horizonServer.loadAccount(addr);
      let tx = new TransactionBuilder(account, { fee: "100", networkPassphrase: "Test SDF Network ; September 2015" })
          .addOperation(contract.call("balance", param_id))
          .setTimeout(30)
          .build();
          
      const sim = await sorobanServer.simulateTransaction(tx);
      if (rpc.Api.isSimulationSuccess(sim)) {
          const resultXdr = sim.result.retval;
          // The result is an i128 representing stroops
          const balanceStroops = scValToBigInt(resultXdr);
          const balanceToken = Number(balanceStroops) / 10000000;
          setBalance(balanceToken.toString());
      } else {
          setBalance('0');
      }
    } catch (e) {
      console.error("Fetch balance error", e);
      setBalance('0');
    }
  }, []);

  useEffect(() => {
    if (address) {
      fetchBalance(address);
    } else {
      setBalance(null);
    }
  }, [address, fetchBalance]);

  const connect = useCallback(async () => {
    try {
      setError(null);
      // Calls the native V2 modal module! 
      const { address } = await StellarWalletsKit.authModal();
      setAddress(address);
    } catch (e) {
      console.error(e);
      let errorString = String(e).toLowerCase();
      if (errorString.includes('not installed') || errorString.includes('extension')) {
          setError('WALLET_NOT_FOUND');
      } else if (errorString.includes('reject') || errorString.includes('declined') || errorString.includes('user cancelled')) {
          setError('TRANSACTION_REJECTED');
      } else {
          setError('UNKNOWN');
      }
    }
  }, []);

  const disconnect = async () => {
    setAddress(null);
    try { await StellarWalletsKit.disconnect(); } catch(e) {}
  };
  const clearError = () => setError(null);

  return { address, balance, connect, disconnect, error, clearError, fetchBalance, kit: StellarWalletsKit };
}
