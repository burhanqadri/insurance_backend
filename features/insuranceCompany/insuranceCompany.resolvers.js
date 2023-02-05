const resolvers = {
  Query: {
    insuranceCompany: async (_, { insuranceCompanyID }) => {
      return await InsuranceCompany.findOne({ insuranceCompanyID });
    },
    insuranceCompanies: async (_, args, { InsuranceCompany }) => {
      return await InsuranceCompany.find({});
    },
  },
  Mutation: {
    createInsuranceCompany: async (_, { name, howToTrack, howToReimburse }) => {
      const newInsuranceCompany = await new InsuranceCompany({
        name,
        howToTrack,
        howToReimburse,
      }).save();
      return newInsuranceCompany;
    },
    updateInsuranceCompany: async (
      _,
      { insuranceCompanyID, name, howToTrack, howToReimburse }
    ) => {
      const updatedInsuranceCompany = await InsuranceCompany.findOneAndUpdate(
        { insuranceCompanyID },
        { $set: { name, howToTrack, howToReimburse } }
      );
      return updatedInsuranceCompany;
    },
    deleteInsuranceCompany: async (_, { insuranceCompanyID }) => {
      const deletedInsuranceCompany = await InsuranceCompany.findOneAndDelete({
        insuranceCompanyID,
      });
      return deletedInsuranceCompany;
    },
  },
};

module.exports = resolvers;
