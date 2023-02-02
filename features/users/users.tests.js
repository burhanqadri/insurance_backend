// const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');
// const User = require('./models/User');
// const typeDefs = require('./schema');
// const resolvers = require('./resolvers');

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// describe('User', () => {
//   beforeEach(async () => {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     await User.deleteMany({});
//   });

//   afterEach(async () => {
//     await mongoose.disconnect();
//   });

//   it('can create a user', async () => {
//     const user = await User.create({
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       location: 'New York',
//       company: 'Acme Inc.',
//       answers: ['Yes', 'No', 'Maybe'],
//     });

//     expect(user.name).toBe('John Doe');
//     expect(user.email).toBe('johndoe@example.com');
//     expect(user.location).toBe('New York');
//     expect(user.company).toBe('Acme Inc.');
//     expect(user.answers).toEqual(['Yes', 'No', 'Maybe']);
//   });

//   it('can retrieve a user', async () => {
//     const user = await User.create({
//       name: 'Jane Doe',
//       email: 'janedoe@example.com',
//       location: 'London',
//       company: 'Big Corp',
//       answers: ['Yes', 'No'],
//     });

//     const retrievedUser = await User.findById(user._id);

//     expect(retrievedUser.name).toBe('Jane Doe');
//     expect(retrievedUser.email).toBe('janedoe@example.com');
//     expect(retrievedUser.location).toBe('London');
//     expect(retrievedUser.company).toBe('Big Corp');
//     expect(retrievedUser.answers).toEqual(['Yes', 'No']);
//   });

//   it('can update a user', async () => {
//     const user = await User.create({
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       location: 'New York',
//       company: 'Acme Inc.',
//       answers: ['Yes', 'No', 'Maybe'],
//     });

//     const updatedUser = await User.findByIdAndUpdate(
//       user._id,
//       {
//         name: 'Jane Doe',
//         email: 'janedoe@example.com',
//         location: 'London',
//         company: 'Big Corp',
//         answers: ['Yes', 'No'],
//       },
//       { new: true },
//     );

//     expect(updatedUser.name).toBe('Jane Doe');
//     expect(updatedUser.email).toBe('janedoe@example.com');
//     expect
