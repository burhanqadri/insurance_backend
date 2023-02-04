const Provider = require("./mongo.provider");
const InsuranceCompany = require("../insuranceCompany/mongo.insuranceCompany");

const resolvers = {
  Query: {
    providers: async (parent, args, context, info) => {
      const providers = await Provider.find();
      return providers;
    },
    provider: async (parent, args, context, info) => {
      const provider = await Provider.findById(args.providerID);
      return provider;
    },
  },
  Mutation: {
    createProvider: async (parent, args, context, info) => {
      const insuranceCompanies = await InsuranceCompany.find({
        name: { $in: args.insuranceCompaniesCompatible },
      });

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
        insuranceCompaniesCompatible: insuranceCompanies,
        servicesCoveredName: args.servicesCoveredName,
      });

      const savedProvider = await newProvider.save();
      return savedProvider;
    },
    updateProvider: async (parent, args, context, info) => {
      const insuranceCompanies = await InsuranceCompany.find({
        name: { $in: args.insuranceCompaniesCompatible },
      });

      const updatedProvider = await Provider.findByIdAndUpdate(
        args.providerID,
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
          insuranceCompaniesCompatible: insuranceCompanies,
          servicesCoveredName: args.servicesCoveredName,
        },
        { new: true }
      );

      return updatedProvider;
    },
    deleteProvider: async (parent, args, context, info) => {
      const deletedProvider = await Provider.findByIdAndDelete(args.providerID);
      return deletedProvider;
    },
  },
  Provider: {
    insuranceCompaniesCompatible: async (parent, args, context, info) => {
      const insuranceCompanies = await InsuranceCompany.find({
        _id: { $in: parent.insuranceCompaniesCompatible },
      });

      return insuranceCompanies;
    },
  },
};

module.exports = resolvers;
