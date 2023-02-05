const ServiceGroup = require("./mongo.serviceGroup");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");
const ServiceCovered = require("../serviceCovered/mongo.serviceCovered");

const serviceGroupResolvers = {
  Query: {
    async allServiceGroups(_, { insurancePlanID }) {
      try {
        const serviceGroups = await ServiceGroup.find({
          insurancePlan: insurancePlanID,
        });
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
        const newServiceGroupID = name + Date.now().toString();
        const serviceGroup = new ServiceGroup({
          serviceGroupID: newServiceGroupID,
          name,
          percentageCovered,
          maxCombined,
          timePeriod,
          insurancePlan: insurancePlanID,
          services: serviceIDs,
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
