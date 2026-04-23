import { Wallet, LogOut, AlertCircle, X } from 'lucide-react';

export function WalletConnection({ wallet }) {
  const { address, connect, disconnect, error, clearError } = wallet;
  
  return (
    <div className="glass-card mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-secondary/10 rounded-2xl">
            <Wallet className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Wallet Connection</h2>
            <p className="text-muted text-sm">
              {address ? 'Connected to Stellar Testnet' : 'Access the Soroban decentralized platform'}
            </p>
          </div>
        </div>

        {address ? (
          <button 
            className="btn bg-white/5 border border-white/10 hover:bg-white/10 text-white w-full md:w-auto" 
            onClick={disconnect}
          >
            <LogOut className="w-4 h-4" />
            {address.slice(0, 5)}...{address.slice(-4)}
          </button>
        ) : (
          <button 
            className="btn btn-primary w-full md:w-auto px-10" 
            onClick={connect}
          >
            Connect Wallet
          </button>
        )}
      </div>

      {error && (
        <div className="mt-6 flex items-start gap-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="flex-1">
            <strong className="block text-sm font-bold text-red-400">Connection Error</strong> 
            <p className="text-sm mt-0.5 leading-relaxed opacity-90">
                {error === 'WALLET_NOT_FOUND' && 'Wallet extension not found. Please install the Freighter extension.'}
                {error === 'TRANSACTION_REJECTED' && 'Transaction was rejected by user.'}
                {error === 'INSUFFICIENT_BALANCE' && 'Insufficient XLM balance for gas.'}
                {error === 'UNKNOWN' && 'An unexpected unknown error occurred.'}
            </p>
          </div>
          <button 
            onClick={clearError} 
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
