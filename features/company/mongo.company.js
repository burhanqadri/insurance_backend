const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    companyID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
    },
    location: {
      type: String,
    },
    insurancePlans: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
