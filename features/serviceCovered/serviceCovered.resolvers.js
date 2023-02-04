const ServiceCovered = require("./mongo.serviceCovered");
const ServiceGroup = require("../serviceGroup/mongo.serviceGroup");

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
    async getServiceCoverages() {
      try {
        const serviceCoverages = await ServiceCovered.find();
        return serviceCoverages;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  Mutation: {
    async createServiceCovered(_, { input }) {
      try {
        const { serviceGroupID, ...rest } = input;
        const serviceGroup = await ServiceGroup.findOne({ serviceGroupID });

        if (!serviceGroup) {
          throw new Error(`ServiceGroup with id ${serviceGroupID} not found`);
        }

        const newServiceCovered = new ServiceCovered({
          ...rest,
          serviceGroup: serviceGroup._id,
        });
        await newServiceCovered.save();

        return newServiceCovered;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async updateServiceCovered(_, { serviceCoveredID, input }) {
      try {
        const { serviceGroupID, ...rest } = input;
        const serviceGroup = await ServiceGroup.findOne({ serviceGroupID });

        if (!serviceGroup) {
          throw new Error(`ServiceGroup with id ${serviceGroupID} not found`);
        }

        const updatedServiceCovered = await ServiceCovered.findOneAndUpdate(
          { serviceCoveredID },
          {
            ...rest,
            serviceGroup: serviceGroup._id,
          },
          { new: true }
        );

        return updatedServiceCovered;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async deleteServiceCovered(_, { serviceCoveredID }) {
      try {
        const deletedServiceCovered = await ServiceCovered.findOneAndDelete({
          serviceCoveredID,
        });
        return deletedServiceCovered;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};
