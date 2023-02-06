const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClaimSchema = new Schema(
  {
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
      default: false,
    },
    reimbursementReceived: {
      type: Boolean,
      default: false,
    },
    serviceCovered: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Claim", ClaimSchema);
