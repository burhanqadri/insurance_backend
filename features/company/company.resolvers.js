const Company = require("./models/Company");
const InsurancePlan = require("./models/InsurancePlan");

const resolvers = {
  Query: {
    async companies(_, __) {
      return await Company.find({});
    },
    async company(_, { companyID }) {
      return await Company.findById(companyID);
    },
  },
  Mutation: {
    async createCompany(_, { name, logo, location, insurancePlans }) {
      const company = new Company({
        name,
        logo,
        location,
        insurancePlans,
      });
      return await company.save();
    },
    async updateCompany(
      _,
      { companyID, name, logo, location, insurancePlans }
    ) {
      return await Company.findByIdAndUpdate(
        companyID,
        { name, logo, location, insurancePlans },
        { new: true }
      );
    },
    async deleteCompany(_, { companyID }) {
      return await Company.findByIdAndDelete(companyID);
    },
  },
  Company: {
    async insurancePlans(company) {
      return await InsurancePlan.find({
        _id: { $in: company.insurancePlans },
      });
    },
  },
};

module.exports = resolvers;
