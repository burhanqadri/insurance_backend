const Claim = require("./mongo.claim");
const User = require("../user/mongo.user");

async function getUserClaimsBy(filter, limit = 300, startDate, endDate) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  if (startDate) {
    filter.createdAt = { $gte: startDate, $lt: endDate };
  }

  return await Claim.find(filter).sort({ createdAt: -1 }).limit(limit);
}

async function createClaim(claimObj) {
  var claimID = claimObj.uid + Date.now().toString();
  claimObj.claimID = claimID;

  Object.keys(claimObj).forEach((key) =>
    claimObj[key] === undefined ? delete claimObj[key] : {}
  );

  var doc = new Claim(claimObj); // if this doesn't work, do new Claim

  await doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Claim inserted succussfully!");
  });

  return doc;
}

async function updateClaim(claimID, claimObj) {
  Object.keys(claimObj).forEach((key) =>
    claimObj[key] === undefined ? delete claimObj[key] : {}
  );

  return await Claim.findOneAndUpdate(
    {
      claimID,
    },
    claimObj,
    {
      new: true,
    }
  );
}

async function addClaimToUser(uid, claimID) {
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      throw new Error("User not found");
    }

    user.claims.push(args.claimID);

    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getUserClaimsBy,
  createClaim,
  updateClaim,
  addClaimToUser,
};
