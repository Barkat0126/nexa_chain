const User = require('../models/User');
const Transaction = require('../models/Transaction');

// @desc    Get user dashboard data
// @route   GET /api/users/dashboard
const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // You could also aggregate transactions here if needed
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get referral tree (Direct referrals only for simplicity, or nested)
// @route   GET /api/users/referrals
const getReferrals = async (req, res) => {
  try {
    // Simple 1-level fetch. For nested, you'd need a recursive function or aggregation.
    // For this task, we will return direct referrals and maybe their counts.
    const referrals = await User.find({ referrer: req.user._id }).select('username email createdAt totalInvestment');
    
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardData, getReferrals };
