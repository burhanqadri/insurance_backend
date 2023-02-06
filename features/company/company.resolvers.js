const Company = require("./mongo.company");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");

const companyModel = require("./company.model");

const resolvers = {
  Query: {
    getCompaniesBy: async (_, args) => {
      return companyModel.getCompaniesBy(
        {
          companyID: args.companyID,
          name: args.name,
        },
        args.limit
      );
    },
  },
  Mutation: {
    createCompany: (_, { input }) => {
      return companyModel.createCompany({
        name: input.name,
        logo: input.logo,
        location: input.location,
        insurancePlans: input.insurancePlans,
      });
    },
    updateCompany: (_, { companyID, input }) => {
      return companyModel.updateCompany(companyID, {
        name: input.name,
        logo: input.logo,
        location: input.location,
        insurancePlans: input.insurancePlans,
      });
    },
    async deleteCompany(_, args) {
      return companyModel.updateCompany(args.companyID, {
        deleted: true,
      });
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
