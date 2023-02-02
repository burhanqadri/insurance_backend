const User = require("./users.mongo");

const resolvers = {
  Query: {
    getUserBy: async (_, { uid }) => {
      try {
        console.log(uid);
        const user = await User.findOne({ uid: uid });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        const user = new User({
          uid: args.uid,
          name: args.name,
          email: args.email,
          location: args.location,
          company: args.company,
        });
        const result = await user.save();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateUser: async (_, args) => {
      try {
        const user = await User.findOneAndUpdate(
          { uid: args.uid },
          {
            name: args.name,
            email: args.email,
            location: args.location,
            company: args.company,
          },
          { new: true }
        );
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = resolvers;
