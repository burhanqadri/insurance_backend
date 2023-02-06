// const User = require("./mongo.user");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");
const Company = require("../company/mongo.company");
const Claim = require("../claim/mongo.claim");

const userModel = require("./user.model");

module.exports = {
  Query: {
    getUserBy: async (_, { uid, deleted }) => {
      return userModel.getUserBy({ uid: uid, deleted: deleted });
    },
  },
  Mutation: {
    createUser: (_, { input }) => {
      return userModel.createUser({
        uid: input.uid,
        phone: input.phone,
        insurancePlans: input.insurancePlanIDs,
        companies: input.companyIDs,
        // name: input.name,
        // email: input.email,
        // address: input.address,
        // latitude: input.latitude,
        // longitude: input.longitude,
        // claims: [],
      });
    },
    updateUser: (_, { uid, input }) => {
      return userModel.updateUser(uid, {
        phone: input.phone,
        // name: input.name,
        // email: input.email,
        // address: input.address,
        // latitude: input.latitude,
        // longitude: input.longitude,
        insurancePlans: input.insurancePlanIDs,
        companies: input.companyIDs,
        claims: input.claimIDs,
      });
    },
  },
  User: {
    insurancePlans: async (parent, args) => {
      return await Promise.all(
        parent.insurancePlans.map(async (ip) => {
          return await InsurancePlan.findOne({ insurancePlanID: ip });
        })
      );
    },
    companies: async (parent, args) => {
      return await Promise.all(
        parent.companies.map(async (c) => {
          return await Company.findOne({ companyID: c });
        })
      );
    },
    claims: async (parent, args) => {
      return await Promise.all(
        parent.claims.map(async (c) => {
          return await Claim.findOne({ claimID: c });
        })
      );
    },
  },
};
