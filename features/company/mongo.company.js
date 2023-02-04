const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
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
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  insurancePlans: [
    {
      type: String,
    },
  ],
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
