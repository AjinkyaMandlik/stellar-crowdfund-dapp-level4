import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ current, goal }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-3xl font-bold text-white leading-none">
            {current.toLocaleString()} <span className="text-muted text-lg font-medium">XLM</span>
          </h3>
          <p className="text-muted mt-1">raised of {goal.toLocaleString()} XLM goal</p>
        </div>
        <div className="text-right">
          <span className="text-primary font-bold text-2xl">{percentage.toFixed(1)}%</span>
        </div>
      </div>

      <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-amber-600 rounded-full relative"
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-white/20 skew-x-12 translate-x-full animate-[pulse_3s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
};
