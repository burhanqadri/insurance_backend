const ServiceGroup = require("./mongo.serviceGroup");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");
const ServiceCovered = require("../serviceCovered/mongo.serviceCovered");

const serviceGroupModel = require("./serviceGroup.model");

const serviceGroupResolvers = {
  Query: {
    async getServiceGroupsBy(_, args) {
      return serviceGroupModel.getServiceGroupsBy(
        {
          insurancePlan: args.insurancePlanID,
        },
        args.limit
      );
    },
  },
  Mutation: {
    createServiceGroup: (_, { input }) => {
      return serviceGroupModel.createServiceGroup({
        name: input.name,
        percentageCovered: input.percentageCovered,
        maxLifetime: input.maxLifetime,
        maxCombined: input.maxCombined,
        timePeriod: input.timePeriod,
        notes: input.notes,
        insurancePlan: input.insurancePlanID,
        services: input.serviceIDs,
      });
    },
    updateServiceGroup: (_, { serviceGroupID, input }) => {
      return serviceGroupModel.updateServiceGroup(serviceGroupID, {
        name: input.name,
        percentageCovered: input.percentageCovered,
        maxLifetime: input.maxLifetime,
        maxCombined: input.maxCombined,
        timePeriod: input.timePeriod,
        notes: input.notes,
        insurancePlan: input.insurancePlanID,
        services: input.serviceIDs,
      });
    },

    async deleteServiceGroup(_, { serviceGroupID }) {
      return serviceGroupModel.updateServiceGroup(args.serviceGroupID, {
        deleted: true,
      });
    },
  },
};

module.exports = serviceGroupResolvers;
