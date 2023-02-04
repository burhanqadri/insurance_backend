const InsurancePlan = require("./mongo.InsurancePlan");
const InsuranceCompany = require("../insuranceCompany/mongo.insuranceCompany");
const ServiceGroup = require("../serviceGroup/mongo.serviceGroup");
const Company = require("../company/mongo.company");

module.exports = {
  Query: {
    getInsurancePlan: async (_, { insurancePlanID }) => {
      try {
        const insurancePlan = await InsurancePlan.findById(insurancePlanID);
        return insurancePlan;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getInsurancePlans: async () => {
      try {
        const insurancePlans = await InsurancePlan.find();
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
        const insuranceCompany = await InsuranceCompany.findById(
          input.insuranceCompanyID
        );
        if (!insuranceCompany) {
          throw new Error("Insurance Company not found");
        }

        const company = await Company.findById(input.companyID);
        if (!company) {
          throw new Error("Company not found");
        }

        const serviceGroups = input.serviceGroupIDs.map(async (sgID) => {
          return await ServiceGroup.findById(sgID);
        });

        const insurancePlan = new InsurancePlan({
          type: input.type,
          name: input.name,
          insuranceCompany: insuranceCompany,
          company: company,
          serviceGroups: serviceGroups,
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
        const insurancePlan = await InsurancePlan.findById(insurancePlanID);
        if (!insurancePlan) {
          throw new Error("Insurance Plan not found");
        }

        const insuranceCompany = await InsuranceCompany.findById(
          input.insuranceCompanyID
        );
        if (!insuranceCompany) {
          throw new Error("Insurance Company not found");
        }

        const company = await Company.findById(input.companyID);
        if (!company) {
          throw new Error("Company not found");
        }

        const serviceGroups = input.serviceGroupIDs.map(async (sgID) => {
          return await ServiceGroup.findById(sgID);
        });

        insurancePlan.type = input.type;
        insurancePlan.name = input.name;
        insurancePlan.insuranceCompany = insuranceCompany;
        insurancePlan.company = company;
        insurancePlan.serviceGroups = serviceGroups;

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
        const insuranceCompany = await InsuranceCompany.findById(
          parent.insuranceCompany
        );
        return insuranceCompany;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    company: async (parent) => {
      try {
        const company = await Company.findById(parent.company);
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
            return await ServiceGroup.findById(sg);
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
