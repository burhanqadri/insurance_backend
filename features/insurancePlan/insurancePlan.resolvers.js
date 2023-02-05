const InsurancePlan = require("./mongo.insurancePlan");
const InsuranceCompany = require("../insuranceCompany/mongo.insuranceCompany");
const ServiceGroup = require("../serviceGroup/mongo.serviceGroup");
const Company = require("../company/mongo.company");

module.exports = {
  Query: {
    getInsurancePlan: async (_, { insurancePlanID }) => {
      try {
        const insurancePlan = await InsurancePlan.findOne({ insurancePlanID });
        return insurancePlan;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getInsurancePlans: async (_, { companyID }) => {
      try {
        const insurancePlans = await InsurancePlan.find(); //TODO filter it by company
        return insurancePlans;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createInsurancePlan: async (_, { input }) => {
      try {
        const newInsurancePlanID = input.name + Date.now().toString();
        const insurancePlan = new InsurancePlan({
          insurancePlanID: newInsurancePlanID,
          type: input.type,
          name: input.name,
          insuranceCompany: input.insuranceCompanyID,
          company: input.companyID,
          serviceGroups: input.serviceGroupIDs,
        });

        await insurancePlan.save();
        return insurancePlan;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateInsurancePlan: async (_, { insurancePlanID, input }) => {
      try {
        const insurancePlan = await InsurancePlan.findOne({ insurancePlanID });
        if (!insurancePlan) {
          throw new Error("Insurance Plan not found");
        }
        insurancePlan.type = input.type;
        insurancePlan.name = input.name;
        insurancePlan.insuranceCompany = input.insuranceCompanyID;
        insurancePlan.company = input.companyID;
        insurancePlan.serviceGroups = input.serviceGroupIDs;

        await insurancePlan.save();
        return insurancePlan;
      } catch (error) {
        console.log(error);
        throw error;
      }
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
