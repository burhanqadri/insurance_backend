const ServiceType = require("./mongo.serviceType");

async function getServiceTypesBy(filter, limit = 3000) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  return await ServiceType.find(filter).sort({ createdAt: -1 }).limit(limit);
}

async function createServiceType(serviceTypeObj) {
  var serviceTypeID = Date.now().toString();
  serviceTypeObj.serviceTypeID = serviceTypeID;

  Object.keys(serviceTypeObj).forEach((key) =>
    serviceTypeObj[key] === undefined ? delete serviceTypeObj[key] : {}
  );

  var doc = new ServiceType(serviceTypeObj); // if this doesn't work, do new ServiceType

  await doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("ServiceType inserted succussfully!");
  });

  return doc;
}

async function updateServiceType(serviceTypeID, serviceTypeObj) {
  Object.keys(serviceTypeObj).forEach((key) =>
    serviceTypeObj[key] === undefined ? delete serviceTypeObj[key] : {}
  );

  return await ServiceType.findOneAndUpdate(
    {
      serviceTypeID,
    },
    serviceTypeObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getServiceTypesBy,
  createServiceType,
  updateServiceType,
};
