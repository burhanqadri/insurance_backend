const Claim = require("./mongo.claim");
const User = require("../user/mongo.user");
const ServiceCovered = require("../serviceCovered/mongo.serviceCovered");

const claimModel = require("./claim.model");

module.exports = {
  Query: {
    getClaim: async (_, { claimID }) => {
      try {
        const claim = await Claim.findOne({ claimID });
        return claim;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getClaims: async (_, { uid, serviceCoveredID }) => {
      try {
        const claims = await Claim.find({
          user: uid,
          serviceCovered: serviceCoveredID,
        });
        return claims;
      } catch (error) {
        console.log(error);
        throw error;
      }
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
    async addClaimToUser(_, { uid, claimID }) {
      try {
        const user = await User.findOne({ uid });
        if (!user) {
          throw new Error("User not found");
        }

        user.claims.push(claimID);

        await user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async deleteClaim(_, { claimID }) {
      return claimModel.updateClaim(claimID, {
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
