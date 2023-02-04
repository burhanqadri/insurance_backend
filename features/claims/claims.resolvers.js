const Claim = require("path/to/Claim.model");
const User = require("path/to/User.model");
const ServiceCovered = require("path/to/ServiceCovered.model");

module.exports = {
Query: {
getClaim: async (, { claimID }) => {
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
}
},
Mutation: {
createClaim: async (, { input }) => {
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
  service: service
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
}
}
};