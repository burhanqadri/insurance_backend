const ServiceType = require("./mongo.serviceType");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");
const ServiceCovered = require("../serviceCovered/mongo.serviceCovered");

const serviceTypeModel = require("./serviceType.model");

const serviceTypeResolvers = {
  Query: {
    async getServiceTypesBy(_, args) {
      return serviceTypeModel.getServiceTypesBy(
        {
          serviceTypeID: args.serviceTypeID,
          serviceCovered: args.serviceCoveredID,
        },
        args.limit
      );
    },
  },
  Mutation: {
    createServiceType: (_, { input }) => {
      return serviceTypeModel.createServiceType({
        names: input.names,
        maxPerVisit: input.maxPerVisit,
        notes: input.notes,
        serviceCovered: input.serviceCoveredID,
      });
    },
    updateServiceType: (_, { serviceTypeID, input }) => {
      return serviceTypeModel.updateServiceType(serviceTypeID, {
        names: input.names,
        maxPerVisit: input.maxPerVisit,
        notes: input.notes,
        serviceCovered: input.serviceCoveredID,
      });
    },

    async deleteServiceType(_, { serviceTypeID }) {
      return serviceTypeModel.updateServiceType(args.serviceTypeID, {
        deleted: true,
      });
    },
  },
};

module.exports = serviceTypeResolvers;
