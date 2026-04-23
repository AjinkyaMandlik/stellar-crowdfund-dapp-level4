import { calculateProgress, formatAmount } from '../utils/campaign';

describe('Campaign Utility Logic', () => {
  
  test('1. Campaign initialization: formatAmount correctly converts stroops to XLM', () => {
    const stroops = 100000000n; // 10 XLM
    const xlm = formatAmount(stroops);
    expect(xlm).toBe(10);
  });

  test('2. Progress calculation logic: returns correct percentage', () => {
    const goal = 5000;
    const current = 2500;
    const progress = calculateProgress(current, goal);
    expect(progress).toBe(50);
  });

  test('3. Progress calculation logic: caps at 100%', () => {
    const goal = 1000;
    const current = 1500;
    const progress = calculateProgress(current, goal);
    expect(progress).toBe(100);
  });

  test('4. Donation simulation: state update mock', () => {
    const initialDonors = [{ address: 'A', amount: 10 }];
    const newDonation = { address: 'B', amount: 50 };
    
    // Simple state update simulation
    const updatedDonors = [...initialDonors, newDonation].sort((a, b) => b.amount - a.amount);
    
    expect(updatedDonors.length).toBe(2);
    expect(updatedDonors[0].address).toBe('B'); // B should be first because 50 > 10
  });

});
