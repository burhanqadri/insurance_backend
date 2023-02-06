const ServiceCovered = require("./mongo.serviceCovered");

async function getServicesCoveredBy(filter, limit = 3000) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  return await ServiceCovered.find(filter).sort({ createdAt: -1 }).limit(limit);
}

async function createServiceCovered(serviceCoveredObj) {
  var serviceCoveredID = Date.now().toString();
  serviceCoveredObj.serviceCoveredID = serviceCoveredID;

  Object.keys(serviceCoveredObj).forEach((key) =>
    serviceCoveredObj[key] === undefined ? delete serviceCoveredObj[key] : {}
  );

  var doc = new ServiceCovered(serviceCoveredObj); // if this doesn't work, do new ServiceCovered

  await doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("ServiceCovered inserted succussfully!");
  });

  return doc;
}

async function updateServiceCovered(serviceCoveredID, serviceCoveredObj) {
  Object.keys(serviceCoveredObj).forEach((key) =>
    serviceCoveredObj[key] === undefined ? delete serviceCoveredObj[key] : {}
  );

  return await ServiceCovered.findOneAndUpdate(
    {
      serviceCoveredID,
    },
    serviceCoveredObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getServicesCoveredBy,
  createServiceCovered,
  updateServiceCovered,
};
