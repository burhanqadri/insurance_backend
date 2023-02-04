const mongoose = require("mongoose");

const InsurancePlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    servicesCovered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceCovered",
      },
    ],
    percentage: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true }
);

const InsurancePlan = mongoose.model("InsurancePlan", InsurancePlanSchema);
module.exports = InsurancePlan;
