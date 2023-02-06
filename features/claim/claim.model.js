const claimDatabase = require("./mongo.claim");

async function getUserClaimsBy(filter, limit = 28, startDate, endDate) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  if (startDate) {
    filter.createdAt = { $gte: startDate, $lt: endDate };
  }

  return await claimDatabase.find(filter).sort({ createdAt: -1 }).limit(limit);
}

async function createClaim(claimObj) {
  var claimID = claimObj.uid + Date.now().toString();
  claimObj.claimID = claimID;

  Object.keys(claimObj).forEach((key) =>
    claimObj[key] === undefined ? delete claimObj[key] : {}
  );

  var doc = new claimDatabase(claimObj); // if this doesn't work, do new Claim

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

  return await claimDatabase.findOneAndUpdate(
    {
      claimID,
    },
    claimObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getUserClaimsBy,
  createClaim,
};
