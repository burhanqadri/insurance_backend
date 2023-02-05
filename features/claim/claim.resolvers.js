const Claim = require("./mongo.claim");
const User = require("../user/mongo.user");
const ServiceCovered = require("../serviceCovered/mongo.serviceCovered");

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
    async createClaim(_, { input }) {
      try {
        const newClaimID = input.userID + Date.now().toString();
        const claim = new Claim({
          claimID: newClaimID,
          amount: input.amount,
          date: input.date,
          reimbursementFiled: input.reimbursementFiled,
          reimbursementReceived: input.reimbursementReceived,
          user: input.userID,
          serviceCovered: input.serviceCoveredID,
        });

        await claim.save();
        return claim;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async updateClaim(_, { claimID, input }) {
      try {
        claim.amount = input.amount;
        claim.date = input.date;
        claim.reimbursementFiled = input.reimbursementFiled;
        claim.reimbursementReceived = input.reimbursementReceived;
        claim.user = input.userID;
        claim.serviceCovered = input.serviceCoveredID;

        await claim.save();
        return claim;
      } catch (error) {
        console.log(error);
        throw error;
      }
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
    async deleteClaim(_, { uid, claimID }) {
      try {
        const user = await User.findOne({ uid });
        if (!user) {
          throw new Error("User not found");
        }

        user.claims = user.claims.filter((c) => c !== claimID);

        await user.save();
        return await Claim.findOneAndDelete({ claimID });
      } catch (error) {
        console.log(error);
        throw error;
      }
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
