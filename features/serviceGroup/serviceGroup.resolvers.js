const ServiceGroup = require("./mongo.serviceGroup");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");
const ServiceCovered = require("../serviceCovered/mongo.serviceCovered");

const serviceGroupResolvers = {
  Query: {
    async allServiceGroups() {
      try {
        const serviceGroups = await ServiceGroup.find({ insurancePlanID });
        return serviceGroups;
      } catch (err) {
        throw err;
      }
    },
    async serviceGroup(_, { serviceGroupID }) {
      try {
        const serviceGroup = await ServiceGroup.findOne({ serviceGroupID });
        return serviceGroup;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    async createServiceGroup(
      _,
      {
        name,
        percentageCovered,
        maxCombined,
        timePeriod,
        insurancePlanID,
        serviceIDs,
      }
    ) {
      try {
        const insurancePlan = await InsurancePlan.findOne({ insurancePlanID });
        if (!insurancePlan) {
          throw new Error("Insurance plan not found");
        }

        const services = [];
        for (const serviceID of serviceIDs) {
          const service = await ServiceCovered.findOne({
            serviceCoveredID: serviceID,
          });
          if (!service) {
            throw new Error(`Service with ID ${serviceID} not found`);
          }
          services.push(service);
        }

        const serviceGroup = new ServiceGroup({
          name,
          percentageCovered,
          maxCombined,
          timePeriod,
          insurancePlan,
          services,
        });

        const result = await serviceGroup.save();
        return result;
      } catch (err) {
        throw err;
      }
    },
    async updateServiceGroup(
      _,
      {
        serviceGroupID,
        name,
        percentageCovered,
        maxCombined,
        timePeriod,
        insurancePlanID,
        serviceIDs,
      }
    ) {
      try {
        const insurancePlan = await InsurancePlan.findOne({ insurancePlanID });
        if (!insurancePlan) {
          throw new Error("Insurance plan not found");
        }

        const services = [];
        for (const serviceID of serviceIDs) {
          const service = await ServiceCovered.findOne({
            serviceCoveredID: serviceID,
          });
          if (!service) {
            throw new Error(`Service with ID ${serviceID} not found`);
          }
          services.push(service);
        }

        const serviceGroup = await ServiceGroup.findOneAndUpdate(
          { serviceGroupID },
          {
            name,
            percentageCovered,
            maxCombined,
            timePeriod,
            insurancePlan,
            services,
          },
          { new: true }
        );

        if (!serviceGroup) {
          throw new Error("Service group not found");
        }

        return serviceGroup;
      } catch (err) {
        throw err;
      }
    },
    async deleteServiceGroup(_, { serviceGroupID }) {
      try {
        const serviceGroup = await ServiceGroup.findOneAndDelete({
          serviceGroupID,
        });
        if (!serviceGroup) {
          throw new Error("Service group not found");
        }
        return serviceGroup;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = serviceGroupResolvers;
