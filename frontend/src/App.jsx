import { useState, useEffect } from 'react';
import { useWallet } from './hooks/useWallet';
import { useContract } from './hooks/useContract';
import { useEvents } from './hooks/useEvents';

import { Layout } from './components/Layout';
import { WalletConnection } from './components/WalletConnection';
import { ProgressBar } from './components/ProgressBar';
import { DonationForm } from './components/DonationForm';
import { DonorList } from './components/DonorList';

import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import { Rocket, ShieldCheck, Globe } from 'lucide-react';
import './index.css';

const GOAL_TOKEN = 5000;

function App() {
  const wallet = useWallet();
  const { donate, txStatus, txHash } = useContract(wallet.kit, wallet.address);
  const { totalFunds, donors, isLoading: isEventsLoading } = useEvents();
  
  const [amount, setAmount] = useState('');
  const [isPledging, setIsPledging] = useState(false);

  useEffect(() => {
      if (txStatus === 'success') {
          confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#f59e0b', '#60a5fa', '#ffffff']
          });
          toast.success('Successfully donated to the cause!', {
            icon: '🔥',
            duration: 5000,
          });
          wallet.fetchBalance(wallet.address);
      } else if (txStatus === 'fail') {
          toast.error('Transaction failed. Please try again.');
      }
  }, [txStatus, wallet]);

  const totalToken = Number(totalFunds) / 10000000;

  const handleDonate = async () => {
    if (!amount || isPledging) return;
    
    const toastId = toast.loading('Waiting for wallet approval...');
    setIsPledging(true);
    
    try {
      await donate(amount, 
        () => {
          toast.loading('Transaction broadcasting...', { id: toastId });
        }, 
        () => {
          setIsPledging(false);
          setAmount('');
          toast.dismiss(toastId);
        }
      );
    } catch (error) {
      toast.error('Something went wrong.');
      setIsPledging(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <Layout>
      <header className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest animate-fade-in">
          <Rocket className="w-3 h-3" />
          Live on Stellar Testnet
        </div>
        <h1 className="text-5xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight">
          Stellar <span className="text-primary italic">Crowdfund</span>
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          Propelling the next generation of decentralized innovation on Soroban. Transparent, secure, and community-driven.
        </p>
      </header>

      <WalletConnection wallet={wallet} />

      <main className="grid grid-cols-1 gap-8">
        <section className="glass-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe className="w-32 h-32 text-primary" />
          </div>

          <div className="relative space-y-10">
            <div>
              <h2 className="text-2xl font-bold mb-2">Campaign: Decentralized Future</h2>
              <p className="text-muted text-sm">Funding open-source tools for the Soroban ecosystem.</p>
            </div>
            
            <ProgressBar current={totalToken} goal={GOAL_TOKEN} />

            <DonationForm 
              amount={amount}
              setAmount={setAmount}
              onDonate={handleDonate}
              isProcessing={isPledging}
              isDisabled={!wallet.address}
              balance={wallet.balance}
            />

            <div className="flex flex-wrap gap-6 pt-4 border-t border-card-border/50">
              <div className="flex items-center gap-2 text-xs text-muted">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                Verified Soroban Contract
              </div>
              <div className="flex items-center gap-2 text-xs text-muted">
                <Globe className="w-4 h-4 text-green-500" />
                Global Access
              </div>
            </div>
          </div>
        </section>

        <section>
          <DonorList donors={donors} isLoading={isEventsLoading} />
        </section>
      </main>
    </Layout>
  );
}

export default App;
