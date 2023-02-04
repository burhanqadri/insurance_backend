const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClaimSchema = new Schema({
  claimID: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  reimbursementFiled: {
    type: Boolean,
    required: true,
    default: false,
  },
  reimbursementReceived: {
    type: Boolean,
    required: true,
    default: false,
  },
  service: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Claim", ClaimSchema);
