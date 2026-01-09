const cron = require('node-cron');
const Investment = require('./models/Investment');
const User = require('./models/User');
const Transaction = require('./models/Transaction');

// Level Income Percentages (Level 1, Level 2, Level 3)
const LEVEL_INCOME_PERCENTAGES = [0.05, 0.03, 0.01]; // 5%, 3%, 1%

const calculateDailyRoi = async () => {
  console.log('Running Daily ROI Calculation...');
  
  try {
    const activeInvestments = await Investment.find({ 
      status: 'active', 
      endDate: { $gt: new Date() } 
    }).populate('user');

    for (const investment of activeInvestments) {
      const user = investment.user;
      
      // Calculate ROI Amount
      const roiAmount = investment.amount * (investment.dailyRoiPercentage / 100);
      
      // Update User Wallet & Stats
      user.walletBalance += roiAmount;
      user.roiIncome += roiAmount;
      user.totalIncome += roiAmount;
      await user.save();

      // Create ROI Transaction
      await Transaction.create({
        user: user._id,
        amount: roiAmount,
        type: 'roi',
        description: `Daily ROI for plan ${investment.plan}`,
      });

      // Distribute Level Income
      let currentUpline = await User.findById(user.referrer);
      let level = 0;

      while (currentUpline && level < LEVEL_INCOME_PERCENTAGES.length) {
        const levelIncome = roiAmount * LEVEL_INCOME_PERCENTAGES[level];

        if (levelIncome > 0) {
          currentUpline.walletBalance += levelIncome;
          currentUpline.levelIncome += levelIncome;
          currentUpline.totalIncome += levelIncome;
          await currentUpline.save();

          // Create Level Income Transaction
          await Transaction.create({
            user: currentUpline._id,
            amount: levelIncome,
            type: 'level_income',
            relatedUser: user._id,
            description: `Level ${level + 1} income from ${user.username}`,
          });
        }

        // Move to next upline
        if (currentUpline.referrer) {
          currentUpline = await User.findById(currentUpline.referrer);
        } else {
          currentUpline = null;
        }
        level++;
      }

      // Update Investment lastRoiDate
      investment.lastRoiDate = new Date();
      await investment.save();
    }
    
    console.log(`Processed ROI for ${activeInvestments.length} investments.`);
  } catch (error) {
    console.error('Error in Daily ROI Cron:', error);
  }
};

const start = () => {
  // Run every day at midnight (0 0 * * *)
  // For testing purposes, we can set it to run every minute: '*/1 * * * *'
  cron.schedule('0 0 * * *', calculateDailyRoi);
  console.log('Cron Job scheduled: Daily ROI at Midnight');
};

module.exports = { start, calculateDailyRoi }; // Exporting function for manual testing if needed
