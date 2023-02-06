const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const insuranceCompanySchema = new Schema(
  {
    insuranceCompanyID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    howToTrack: {
      type: String,
    },
    howToReimburse: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InsuranceCompany", insuranceCompanySchema);
