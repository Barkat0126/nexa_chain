const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['roi', 'level_income', 'deposit', 'withdrawal'], 
    required: true 
  },
  description: { type: String },
  relatedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For referral bonuses
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
