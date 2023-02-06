const InsurancePlan = require("./mongo.insurancePlan");
const InsuranceCmpany = require("../insuranceCompany/mongo.insuranceCompany");
const ServiceGroup = require("../serviceGroup/mongo.serviceGroup");
const Company = require("../company/mongo.company");

module.exports = {
  Query: {
    getInsurancePlansBy: async (_, args) => {
      return insurancePlanModel.getCompaniesBy(
        {
          insurancePlanID: args.insurancePlanID,
          name: args.name,
          company: args.companyID,
        },
        args.limit
      );
    },
  },
  Mutation: {
    createInsurancePlan: (_, { input }) => {
      return insurancePlanModel.createInsurancePlan({
        type: input.type,
        name: input.name,
        insuranceCompany: input.insuranceCompany,
        company: input.companyID,
        serviceGroups: input.serviceGroupIDs,
      });
    },

    updateInsurancePlan: async (_, { insurancePlanID, input }) => {
      return insurancePlanModel.updateInsurancePlan(insurancePlanID, {
        type: input.type,
        name: input.name,
        insuranceCompany: input.insuranceCompany,
        company: input.companyID,
        serviceGroups: input.serviceGroupIDs,
      });
    },
    deleteInsurancePlan: async (_, { insurancePlanID }) => {
      return insurancePlanModel.updateInsurancePlan(args.insurancePlanID, {
        deleted: true,
      });
    },
  },
  InsurancePlan: {
    insuranceCompany: async (parent) => {
      try {
        const insuranceCompany = await InsuranceCompany.findOne({
          insuranceCompanyID: parent.insuranceCompany,
        });
        return insuranceCompany;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    company: async (parent) => {
      try {
        const company = await Company.findOne({ companyID: parent.company });
        return company;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    serviceGroups: async (parent) => {
      try {
        const serviceGroups = await Promise.all(
          parent.serviceGroups.map(async (sg) => {
            return await ServiceGroup.findOne({ serviceGroupID: sg });
          })
        );
        return serviceGroups;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
