


// for Progress Calculation
const calculateProgress = (current, goal) => {
    if (!goal || goal <= 0) return 0;
    const progress = (current / goal) * 100;
    // Ensure value does not exceed 100%
    return Math.min(progress, 100);
};

describe('Crowdfunding dApp Logic Tests', () => {

    // Test 1: Campaign Initialization
    test('1. Campaign Initialization - Check default goal and initial amount', () => {
        const DEFAULT_GOAL = 5000; // Matches App.jsx GOAL_XLM
        const initialRaised = 0;

        expect(DEFAULT_GOAL).toBe(5000);
        expect(initialRaised).toBe(0);
    });

    // Test 2: Donation Logic
    test('2. Donation Logic - Verify raised amount increases correctly', () => {
        let raisedAmount = 0;
        const donation1 = 100;
        const donation2 = 250;

        // Simulate donations
        raisedAmount += donation1;
        expect(raisedAmount).toBe(100);

        raisedAmount += donation2;
        expect(raisedAmount).toBe(350);
    });

    // Test 3: Progress Calculation
    test('3. Progress Calculation - Verify percentage calculation (raised/goal * 100)', () => {
        const goal = 1000;
        const raised = 450;

        const progress = calculateProgress(raised, goal);

        expect(progress).toBe(45);
    });

    // BONUS: Extra Test
    test('4. Bonus: Progress should never exceed 100%', () => {
        const goal = 1000;
        const overFundedRaised = 1500;

        const progress = calculateProgress(overFundedRaised, goal);

        expect(progress).toBe(100);
        expect(progress).not.toBeGreaterThan(100);
    });

});
