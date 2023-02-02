const User = require("./users.mongo");

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
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
          name: args.name,
          email: args.email,
          location: args.location,
          company: args.company,
          answers: args.answers,
        });
        const result = await user.save();
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateUser: async (_, args) => {
      try {
        const user = await User.findByIdAndUpdate(
          args.id,
          {
            name: args.name,
            email: args.email,
            location: args.location,
            company: args.company,
            answers: args.answers,
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
