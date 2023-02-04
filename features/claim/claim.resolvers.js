const Claim = require("./mongo.claim");
const User = require("../user/mongo.user");
const ServiceCovered = require("../serviceCovered/mongo.serviceCovered");

module.exports = {
  Query: {
    getClaim: async (_, { claimID }) => {
      try {
        const claim = await Claim.findById(claimID);
        return claim;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getClaims: async () => {
      try {
        const claims = await Claim.find();
        return claims;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createClaim: async (_, { input }) => {
      try {
        const user = await User.findById(input.userID);
        if (!user) {
          throw new Error("User not found");
        }
        const service = await ServiceCovered.findById(input.serviceID);
        if (!service) {
          throw new Error("Service Covered not found");
        }

        const claim = new Claim({
          amount: input.amount,
          date: input.date,
          reimbursementFiled: input.reimbursementFiled,
          reimbursementReceived: input.reimbursementReceived,
          user: user,
          service: service,
        });

        await claim.save();
        return claim;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateClaim: async (_, { claimID, input }) => {
      try {
        const claim = await Claim.findById(claimID);
        if (!claim) {
          throw new Error("Claim not found");
        }

        const user = await User.findById(input.userID);
        if (!user) {
          throw new Error("User not found");
        }

        const service = await ServiceCovered.findById(input.serviceID);
        if (!service) {
          throw new Error("Service Covered not found");
        }

        claim.amount = input.amount;
        claim.date = input.date;
        claim.reimbursementFiled = input.reimbursementFiled;
        claim.reimbursementReceived = input.reimbursementReceived;
        claim.user = user;
        claim.service = service;

        await claim.save();
        return claim;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    addClaimToUser: async (_, { uid, claimID }) => {
      try {
        const user = await User.findById(uid);
        if (!user) {
          throw new Error("User not found");
        }
        const claim = await Claim.findById(claimID);
        if (!claim) {
          throw new Error("Claim not found");
        }

        user.claims.push(claim);

        await user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    removeClaimFromUser: async (_, { uid, claimID }) => {
      try {
        const user = await User.findById(uid);
        if (!user) {
          throw new Error("User not found");
        }
        const claim = await Claim.findById(claimID);
        if (!claim) {
          throw new Error("Claim not found");
        }

        user.claims = user.claims.filter((c) => c._id.toString() !== claimID);

        await user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
