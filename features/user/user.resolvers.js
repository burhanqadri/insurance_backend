const User = require("./mongo.user");
const InsurancePlan = require("../insurancePlan/mongo.insurancePlan");
const Company = require("../company/mongo.company");
const Claim = require("../claim/mongo.claim");

module.exports = {
  Query: {
    getUser: async (_, { uid }) => {
      try {
        const user = await User.findById(uid);
        return user;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    getUsers: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const insurancePlans = input.insurancePlanIDs.map(async (ipID) => {
          return await InsurancePlan.findById(ipID);
        });
        const companies = input.companyIDs.map(async (cID) => {
          return await Company.findById(cID);
        });

        const user = new User({
          uid: input.uid,
          phone: input.phone,
          name: input.name,
          email: input.email,
          address: input.address,
          latitude: input.latitude,
          longitude: input.longitude,
          insurancePlans: insurancePlans,
          companies: companies,
          claims: [],
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
        const user = await User.findById(uid);
        if (!user) {
          throw new Error("User not found");
        }

        const insurancePlans = input.insurancePlanIDs.map(async (ipID) => {
          return await InsurancePlan.findById(ipID);
        });

        const companies = input.companyIDs.map(async (cID) => {
          return await Company.findById(cID);
        });

        user.phone = input.phone;
        user.name = input.name;
        user.email = input.email;
        user.address = input.address;
        user.latitude = input.latitude;
        user.longitude = input.longitude;
        user.insurancePlans = insurancePlans;
        user.companies = companies;

        await user.save();
        return user;
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
  User: {
    insurancePlan: async (parent, args, context, info) => {
      return await Promise.all(
        parent.insurancePlan.map(async (ip) => {
          return await InsurancePlan.findById(ip._id);
        })
      );
    },
    company: async (parent, args, context, info) => {
      return await Promise.all(
        parent.company.map(async (c) => {
          return await Company.findById(c._id);
        })
      );
    },
    claims: async (parent, args, context, info) => {
      return await Promise.all(
        parent.claims.map(async (c) => {
          return await Claim.findById(c._id);
        })
      );
    },
  },
};
