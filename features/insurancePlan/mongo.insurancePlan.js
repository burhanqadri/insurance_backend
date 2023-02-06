const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InsurancePlanSchema = new Schema(
  {
    insurancePlanID: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    insuranceCompany: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    serviceGroups: [
      {
        type: String,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InsurancePlan", InsurancePlanSchema);
