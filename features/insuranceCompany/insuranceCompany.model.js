const InsuranceCompany = require("./mongo.insuranceCompany");

async function getInsuranceCompaniesBy(filter, limit = 3000) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  return await InsuranceCompany.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit);
}

async function createInsuranceCompany(insuranceCompanyObj) {
  var insuranceCompanyID = Date.now().toString();
  insuranceCompanyObj.insuranceCompanyID = insuranceCompanyID;

  Object.keys(insuranceCompanyObj).forEach((key) =>
    insuranceCompanyObj[key] === undefined
      ? delete insuranceCompanyObj[key]
      : {}
  );

  var doc = new InsuranceCompany(insuranceCompanyObj); // if this doesn't work, do new InsuranceCompany

  await doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("InsuranceCompany inserted succussfully!");
  });

  return doc;
}

async function updateInsuranceCompany(insuranceCompanyID, insuranceCompanyObj) {
  Object.keys(insuranceCompanyObj).forEach((key) =>
    insuranceCompanyObj[key] === undefined
      ? delete insuranceCompanyObj[key]
      : {}
  );

  return await InsuranceCompany.findOneAndUpdate(
    {
      insuranceCompanyID,
    },
    insuranceCompanyObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getInsuranceCompaniesBy,
  createInsuranceCompany,
  updateInsuranceCompany,
};
