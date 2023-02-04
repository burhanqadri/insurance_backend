const Company = require("./mongo.company");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");

const resolvers = {
  Query: {
    async companies(_, __) {
      return await Company.find({});
    },
    async company(_, { companyID }) {
      return await Company.findOne({ companyID });
    },
  },
  Mutation: {
    async createCompany(_, { name, logo, location, insurancePlans }) {
      const newCompanyID = name + Date.now().toString();
      const company = new Company({
        companyID: newCompanyID,
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
      return await Company.findOneAndUpdate(
        { companyID },
        { name, logo, location, insurancePlans },
        { new: true }
      );
    },
    async deleteCompany(_, { companyID }) {
      return await Company.findOneAndDelete({ companyID });
    },
  },
  Company: {
    async insurancePlans(company) {
      return await InsurancePlan.find({
        insurancePlanID: { $in: company.insurancePlans },
      });
    },
  },
};

module.exports = resolvers;
