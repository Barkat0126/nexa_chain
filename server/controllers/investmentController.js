const Investment = require('../models/Investment');
const User = require('../models/User');

// @desc    Create new investment
// @route   POST /api/investments
const createInvestment = async (req, res) => {
  const { amount, plan } = req.body;

  try {
    // Determine ROI and Duration based on plan (Simplified logic)
    let dailyRoiPercentage = 1.5; // Default 1.5%
    let durationDays = 30;

    if (plan === 'Premium') {
      dailyRoiPercentage = 2.5;
      durationDays = 60;
    }

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationDays);

    const investment = await Investment.create({
      user: req.user._id,
      amount,
      plan,
      dailyRoiPercentage,
      endDate,
      startDate: new Date(),
    });

    // Update User's total investment
    const user = await User.findById(req.user._id);
    user.totalInvestment += Number(amount);
    await user.save();

    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user investments
// @route   GET /api/investments
const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user._id });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createInvestment, getInvestments };
