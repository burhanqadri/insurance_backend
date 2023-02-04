const InsuranceCompany = require("./mongo.insuranceCompany");

const resolvers = {
  Query: {
    insuranceCompanies: () => InsuranceCompany.find(),
    insuranceCompany: (_, { insuranceCompanyID }) =>
      InsuranceCompany.findOne({ insuranceCompanyID }),
  },
  Mutation: {
    createInsuranceCompany: (_, args) => InsuranceCompany.create(args),
    updateInsuranceCompany: (_, { insuranceCompanyID, ...rest }) =>
      InsuranceCompany.findOneAndUpdate({ insuranceCompanyID }, rest, {
        new: true,
      }),
    deleteInsuranceCompany: async (_, { insuranceCompanyID }) => {
      const insuranceCompany = await InsuranceCompany.findOne({
        insuranceCompanyID,
      });
      if (!insuranceCompany) {
        throw new Error("Insurance Company not found");
      }
      await insuranceCompany.delete();
      return "Insurance Company deleted successfully";
    },
  },
};

module.exports = resolvers;
