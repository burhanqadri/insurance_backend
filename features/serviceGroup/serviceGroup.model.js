const ServiceGroup = require("./mongo.serviceGroup");

async function getServiceGroupsBy(filter, limit = 3000) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  return await ServiceGroup.find(filter).sort({ createdAt: -1 }).limit(limit);
}

async function createServiceGroup(serviceGroupObj) {
  var serviceGroupID = Date.now().toString();
  serviceGroupObj.serviceGroupID = serviceGroupID;

  Object.keys(serviceGroupObj).forEach((key) =>
    serviceGroupObj[key] === undefined ? delete serviceGroupObj[key] : {}
  );

  var doc = new ServiceGroup(serviceGroupObj); // if this doesn't work, do new ServiceGroup

  await doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("ServiceGroup inserted succussfully!");
  });

  return doc;
}

async function updateServiceGroup(serviceGroupID, serviceGroupObj) {
  Object.keys(serviceGroupObj).forEach((key) =>
    serviceGroupObj[key] === undefined ? delete serviceGroupObj[key] : {}
  );

  return await ServiceGroup.findOneAndUpdate(
    {
      serviceGroupID,
    },
    serviceGroupObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getServiceGroupsBy,
  createServiceGroup,
  updateServiceGroup,
};
