const ServiceCovered = require("./mongo.serviceCovered");
const ServiceGroup = require("../serviceGroup/mongo.serviceGroup");

const serviceCoveredModel = require("./serviceCovered.model");

module.exports = {
  Query: {
    async getServiceCovered(_, { serviceCoveredID }) {
      try {
        const serviceCovered = await ServiceCovered.findOne({
          serviceCoveredID,
        });
        return serviceCovered;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  Mutation: {
    async createServiceCovered(_, { input }) {
      return serviceCoveredModel.createServiceCovered({
        name: input.name,
        percentageCovered: input.percentageCovered,
        maxAmount: input.maxAmount,
        maxVisits: input.maxVisits,
        maxUnits: input.maxUnits,
        unitMinutesSize: input.unitMinutesSize,
        timePeriod: input.timePeriod,
        serviceGroupID: input.serviceGroupID,
        deleted: input.deleted,
      });
    },
    async updateServiceCovered(_, { serviceCoveredID, input }) {
      return serviceCoveredModel.updateServiceCovered(serviceCoveredID, input);
    },
    async deleteServiceCovered(_, { serviceCoveredID }) {
      return serviceCoveredModel.updateServiceCovered(args.serviceCoveredID, {
        deleted: true,
      });
    },
  },
};
