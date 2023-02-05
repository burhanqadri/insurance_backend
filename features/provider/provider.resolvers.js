const Provider = require("./mongo.provider");
const InsuranceCompany = require("../insuranceCompany/mongo.insuranceCompany");

const resolvers = {
  Query: {
    providers: async (parent, args, context, info) => {
      const providers = await Provider.find();
      return providers;
    },
    provider: async (parent, args, context, info) => {
      const provider = await Provider.findOne({ providerID: args.providerID });
      return provider;
    },
  },
  Mutation: {
    createProvider: async (parent, args, context, info) => {
      const newProvider = new Provider({
        name: args.name,
        phone: args.phone,
        email: args.email,
        website: args.website,
        description: args.description,
        address: args.address,
        latitude: args.latitude,
        longitude: args.longitude,
        acceptingNew: args.acceptingNew,
        virtualAvailable: args.virtualAvailable,
        reimbursementHandling: args.reimbursementHandling,
        insuranceCompaniesCompatible: args.insuranceCompaniesCompatible,
        servicesCoveredName: args.servicesCoveredName,
      });

      const savedProvider = await newProvider.save();
      return savedProvider;
    },
    updateProvider: async (parent, args, context, info) => {
      const updatedProvider = await Provider.findOneAndUpdate(
        { providerID: args.providerID },
        {
          name: args.name,
          phone: args.phone,
          email: args.email,
          website: args.website,
          description: args.description,
          address: args.address,
          latitude: args.latitude,
          longitude: args.longitude,
          acceptingNew: args.acceptingNew,
          virtualAvailable: args.virtualAvailable,
          reimbursementHandling: args.reimbursementHandling,
          insuranceCompaniesCompatible: args.insuranceCompaniesCompatible,
          servicesCoveredName: args.servicesCoveredName,
        },
        { new: true }
      );

      return updatedProvider;
    },
    deleteProvider: async (_, { providerID }) => {
      const deletedProvider = await Provider.findOneAndDelete({
        providerID,
      });
      return deletedProvider;
    },
  },
  Provider: {
    insuranceCompaniesCompatible: async (parent, args, context, info) => {
      const insuranceCompanies = await InsuranceCompany.find({
        insuranceCompanyID: { $in: parent.insuranceCompaniesCompatible },
      });

      return insuranceCompanies;
    },
  },
};

module.exports = resolvers;
