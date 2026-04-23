import React, { memo } from 'react';
import { Loader2, Zap } from 'lucide-react';

export const DonationForm = memo(({ amount, setAmount, onDonate, isProcessing, isDisabled, balance }) => {
  return (
    <div className="space-y-6">
      {balance !== null && (
        <div className="flex items-center gap-2 text-sm text-muted bg-white/5 w-fit px-3 py-1 rounded-full border border-white/5">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Balance: <span className="text-white font-medium">{balance?.toLocaleString()} TOKEN</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input 
            type="number" 
            placeholder="0.00"
            className="w-full bg-[#0a0a0c] border border-card-border rounded-xl px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted/50"
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            disabled={isDisabled || isProcessing}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted font-medium pointer-events-none">
            TOKEN
          </div>
        </div>

        <button 
          className="btn btn-primary min-w-[180px] shadow-lg shadow-primary/10"
          onClick={onDonate} 
          disabled={isDisabled || isProcessing || !amount || parseFloat(amount) <= 0}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-current" />
              Support Project
            </>
          )}
        </button>
      </div>
      
      {!amount && !isDisabled && !isProcessing && (
        <p className="text-muted text-xs px-2 italic">Enter an amount to start helping the future.</p>
      )}
    </div>
  );
});
