import React from 'react';
import { ExternalLink, Users } from 'lucide-react';

export const DonorList = ({ donors, isLoading }) => {
  return (
    <div className="glass-card !p-0 overflow-hidden border-white/5">
      <div className="px-8 py-6 border-b border-card-border/50 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Recent Backers</h2>
        </div>
        <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {donors.length} Total
        </span>
      </div>
      
      {isLoading ? (
        <div className="p-12 text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted text-sm font-medium animate-pulse">Syncing with Stellar Ledger...</p>
        </div>
      ) : donors.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-muted text-lg">No donations yet.</p>
          <p className="text-muted/60 text-sm mt-1">Be the first to shape the future of this project!</p>
        </div>
      ) : (
        <div className="divide-y divide-card-border/50 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.01]">
                <th className="px-8 py-4 text-xs font-bold text-muted uppercase tracking-widest">Backer</th>
                <th className="px-8 py-4 text-xs font-bold text-muted uppercase tracking-widest text-right">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, idx) => (
                <tr key={idx} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/20 flex items-center justify-center text-xs font-bold text-white/70">
                        {donor.address.slice(1, 3)}
                       </div>
                       <div>
                         <div className="font-mono text-sm flex items-center gap-2 group-hover:text-primary transition-colors">
                           {donor.address.slice(0, 10)}...{donor.address.slice(-4)}
                           <a 
                             href={`https://stellar.expert/explorer/testnet/account/${donor.address}`} 
                             target="_blank" 
                             rel="noreferrer"
                             className="opacity-0 group-hover:opacity-100 transition-opacity"
                           >
                             <ExternalLink className="w-3 h-3" />
                           </a>
                         </div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-bold text-lg text-primary">
                    {donor.amount.toLocaleString()} <span className="text-xs text-muted font-medium ml-1">XLM</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
