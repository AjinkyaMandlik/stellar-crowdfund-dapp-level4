export const calculateProgress = (current, goal) => {
  if (!goal || goal <= 0) return 0;
  return Math.min((current / goal) * 100, 100);
};

export const formatAmount = (stroops) => {
  return Number(stroops) / 10000000;
};
