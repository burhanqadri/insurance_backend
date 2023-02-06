const Claim = require("./mongo.claim");
const User = require("../user/mongo.user");
const ServiceCovered = require("../serviceCovered/mongo.serviceCovered");

const claimModel = require("./claim.model");

module.exports = {
  Query: {
    getUserClaimsBy: async (_, args) => {
      return claimModel.getUserClaimsBy(
        {
          uid: args.uid,
          serviceCovered: args.serviceCoveredID,
        },
        args.limit, //what if this is undefined?
        args.startDate,
        args.endDate
      );
    },
  },
  Mutation: {
    createClaim: (_, { input }) => {
      return claimModel.createClaim({
        amount: input.amount,
        date: input.date,
        reimbursementFiled: input.reimbursementFiled,
        reimbursementReceived: input.reimbursementReceived,
        user: input.uid,
        serviceCovered: input.serviceCoveredID,
      });
    },
    updateClaim: (_, { claimID, input }) => {
      return claimModel.updateClaim(claimID, {
        amount: input.amount,
        date: input.date,
        reimbursementFiled: input.reimbursementFiled,
        reimbursementReceived: input.reimbursementReceived,
        user: input.uid,
        serviceCovered: input.serviceCoveredID,
      });
    },
    async addClaimToUser(_, args) {
      return claimModel.addClaimToUser(args.uid, args.claimID);
    },
    async deleteClaim(_, args) {
      return claimModel.updateClaim(args.claimID, {
        deleted: true,
      });
    },
    // Claim: {
    //   user: (parent) => {
    //     return User.findOne(parent.user);
    //   },
    //   serviceCovered: (parent) => {
    //     return ServiceCovered.findOne(parent.serviceCovered);
    //   },
    // },
  },
};
