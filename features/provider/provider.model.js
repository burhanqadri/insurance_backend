const Provider = require("./mongo.provider");

async function getProvidersBy(filter, limit = 3000) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  return await Provider.find(filter).sort({ createdAt: -1 }).limit(limit);
}

async function createProvider(providerObj) {
  var providerID = Date.now().toString();
  providerObj.providerID = providerID;

  Object.keys(providerObj).forEach((key) =>
    providerObj[key] === undefined ? delete providerObj[key] : {}
  );

  var doc = new Provider(providerObj); // if this doesn't work, do new Provider

  await doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Provider inserted succussfully!");
  });

  return doc;
}

async function updateProvider(providerID, providerObj) {
  Object.keys(providerObj).forEach((key) =>
    providerObj[key] === undefined ? delete providerObj[key] : {}
  );

  return await Provider.findOneAndUpdate(
    {
      providerID,
    },
    providerObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getProvidersBy,
  createProvider,
  updateProvider,
};
