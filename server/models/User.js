const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true },
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  walletBalance: { type: Number, default: 0 },
  totalInvestment: { type: Number, default: 0 },
  totalIncome: { type: Number, default: 0 },
  levelIncome: { type: Number, default: 0 },
  roiIncome: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
