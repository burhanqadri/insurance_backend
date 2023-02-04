const User = require("./mongo.user");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");
const Company = require("../company/mongo.company");
const Claim = require("../claim/mongo.claim");

module.exports = {
  Query: {
    getUser: async (_, { uid }) => {
      try {
        const user = await User.findOne({ uid });
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const user = new User({
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

        await user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateUser: async (_, { uid, input }) => {
      try {
        const user = await User.findOne({ uid });
        if (!user) {
          throw new Error("User not found");
        }

        user.phone = input.phone;
        // user.name = input.name;
        // user.email = input.email;
        // user.address = input.address;
        // user.latitude = input.latitude;
        // user.longitude = input.longitude;
        user.insurancePlans = input.insurancePlanIDs;
        user.companies = input.companyIDs;
        user.claims = input.claimIDs;

        await user.save();
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  User: {
    insurancePlans: async (parent, args, context, info) => {
      return await Promise.all(
        parent.insurancePlans.map(async (ip) => {
          return await InsurancePlan.findOne({ insurancePlanID: ip });
        })
      );
    },
    companies: async (parent, args, context, info) => {
      return await Promise.all(
        parent.companies.map(async (c) => {
          return await Company.findOne({ companyID: c });
        })
      );
    },
    claims: async (parent, args, context, info) => {
      return await Promise.all(
        parent.claims.map(async (c) => {
          return await Claim.findOne({ claimID: c });
        })
      );
    },
  },
};
