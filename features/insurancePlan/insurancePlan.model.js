const InsurancePlan = require("./mongo.insurancePlan");

async function getInsurancePlansBy(filter, limit = 3000) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  return await InsurancePlan.find(filter).sort({ createdAt: -1 }).limit(limit);
}

async function createInsurancePlan(insurancePlanObj) {
  var insurancePlanID = Date.now().toString();
  insurancePlanObj.insurancePlanID = insurancePlanID;

  Object.keys(insurancePlanObj).forEach((key) =>
    insurancePlanObj[key] === undefined ? delete insurancePlanObj[key] : {}
  );

  var doc = new InsurancePlan(insurancePlanObj); // if this doesn't work, do new InsurancePlan

  await doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("InsurancePlan inserted succussfully!");
  });

  return doc;
}

async function updateInsurancePlan(insurancePlanID, insurancePlanObj) {
  Object.keys(insurancePlanObj).forEach((key) =>
    insurancePlanObj[key] === undefined ? delete insurancePlanObj[key] : {}
  );

  return await InsurancePlan.findOneAndUpdate(
    {
      insurancePlanID,
    },
    insurancePlanObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getInsurancePlansBy,
  createInsurancePlan,
  updateInsurancePlan,
};
