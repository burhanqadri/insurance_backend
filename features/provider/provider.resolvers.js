const Provider = require("./mongo.provider");
const InsuranceCompany = require("../insuranceCompany/mongo.insuranceCompany");

const providerModel = require("./provider.model");

const resolvers = {
  Query: {
    getProvidersBy: async (_, args) => {
      return providerModel.getProvidersBy(
        {
          providerID: args.providerID,
          latitude: args.latitude,
          longitude: args.longitude,
          acceptingNew: args.acceptingNew,
          virtualAvailable: args.virtualAvailable,
          reimbursementHandling: args.reimbursementHandling,
        },
        args.limit
      );
    },
  },
  Mutation: {
    createProvider: (_, { input }) => {
      return providerModel.createProvider({
        name: input.name,
        phone: input.phone,
        email: input.email,
        website: input.website,
        description: input.description,
        address: input.address,
        latitude: input.latitude,
        longitude: input.longitude,
        acceptingNew: input.acceptingNew,
        virtualAvailable: input.virtualAvailable,
        reimbursementHandling: input.reimbursementHandling,
        insuranceCompaniesCompatible: input.insuranceCompaniesCompatible,
        servicesCoveredName: input.servicesCoveredName,
      });
    },
    updateProvider: (_, { providerID, input }) => {
      return providerModel.updateProvider(providerID, {
        name: input.name,
        phone: input.phone,
        email: input.email,
        website: input.website,
        description: input.description,
        address: input.address,
        latitude: input.latitude,
        longitude: input.longitude,
        acceptingNew: input.acceptingNew,
        virtualAvailable: input.virtualAvailable,
        reimbursementHandling: input.reimbursementHandling,
        insuranceCompaniesCompatible: input.insuranceCompaniesCompatible,
        servicesCoveredName: input.servicesCoveredName,
        deleted: input.deleted,
      });
    },
    deleteProvider: async (_, args) => {
      return providerModel.updateProvider(args.providerID, {
        deleted: true,
      });
    },
  },
  Provider: {
    insuranceCompaniesCompatible: async (parent, args) => {
      const insuranceCompanies = await InsuranceCompany.find({
        insuranceCompanyID: { $in: parent.insuranceCompaniesCompatible },
      });

      return insuranceCompanies;
    },
  },
};

module.exports = resolvers;
