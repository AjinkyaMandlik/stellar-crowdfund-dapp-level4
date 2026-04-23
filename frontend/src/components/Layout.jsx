import React from 'react';
import { Toaster } from 'react-hot-toast';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30 selection:text-primary">
      {/* Radial Gradient Background */}
      <div className="fixed inset-0 bg-[#0a0a0c] -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,158,11,0.05)_0%,transparent_50%)] -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#15151b',
              color: '#fff',
              border: '1px solid #25252d',
              borderRadius: '12px',
            },
          }}
        />
        {children}
      </div>

      <footer className="max-w-4xl mx-auto px-4 py-8 mt-12 border-t border-card-border/50 text-center text-muted text-sm">
        <p>© 2026 Stellar Crowdfund • Built on Soroban • Level 4 Green Belt</p>
      </footer>
    </div>
  );
};
