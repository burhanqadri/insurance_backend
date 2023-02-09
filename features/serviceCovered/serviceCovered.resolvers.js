const ServiceCovered = require("./mongo.serviceCovered");
const ServiceGroup = require("../serviceGroup/mongo.serviceGroup");

const serviceCoveredModel = require("./serviceCovered.model");

module.exports = {
  Query: {
    async getServicesCoveredBy(_, args) {
      return serviceCoveredModel.getServicesCoveredBy(
        {
          serviceGroup: args.serviceGroupID,
        },
        args.limit
      );
    },
  },
  Mutation: {
    async createServiceCovered(_, { input }) {
      return serviceCoveredModel.createServiceCovered({
        name: input.name,
        percentageCovered: input.percentageCovered,
        maxLifetime: input.maxLifetime,
        maxAmount: input.maxAmount,
        maxVisits: input.maxVisits,
        maxUnits: input.maxUnits,
        unitMinutesSize: input.unitMinutesSize,
        timePeriod: input.timePeriod,
        waitPeriodBetweenVisits: input.waitPeriodBetweenVisits,
        referralRequired: input.referralRequired,
        prescriptionRequired: input.prescriptionRequired,
        notes: input.notes,
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
