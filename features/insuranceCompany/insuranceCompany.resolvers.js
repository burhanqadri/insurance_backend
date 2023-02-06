const InsuranceCompany = require("./mongo.insuranceCompany");
const insuranceCompanyModel = require("./insuranceCompany.model");

const resolvers = {
  Query: {
    getInsuranceCompaniesBy: async (_, args) => {
      return insuranceCompanyModel.getCompaniesBy(
        {
          insuranceCompanyID: args.insuranceCompanyID,
          name: args.name,
        },
        args.limit
      );
    },
  },
  Mutation: {
    createInsuranceCompany: (_, { input }) => {
      return insuranceCompanyModel.createInsuranceCompany({
        name: input.name,
        howToTrack: input.howToTrack,
        howToReimburse: input.howToReimburse,
      });
    },
    updateInsuranceCompany: async (_, { insuranceCompanyID, input }) => {
      return insuranceCompanyModel.updateInsuranceCompany(insuranceCompanyID, {
        name: input.name,
        howToTrack: input.howToTrack,
        howToReimburse: input.howToReimburse,
      });
    },
    deleteInsuranceCompany: async (_, { insuranceCompanyID }) => {
      return insuranceCompanyModel.updateInsuranceCompany(
        args.insuranceCompanyID,
        {
          deleted: true,
        }
      );
    },
  },
};

module.exports = resolvers;
