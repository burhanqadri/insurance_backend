const Company = require("./mongo.company");

async function getCompaniesBy(filter, limit = 3000) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  return await Company.find(filter).sort({ createdAt: -1 }).limit(limit);
}

async function createCompany(companyObj) {
  var companyID = Date.now().toString();
  companyObj.companyID = companyID;

  Object.keys(companyObj).forEach((key) =>
    companyObj[key] === undefined ? delete companyObj[key] : {}
  );

  var doc = new Company(companyObj); // if this doesn't work, do new Company

  await doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Company inserted succussfully!");
  });

  return doc;
}

async function updateCompany(companyID, companyObj) {
  Object.keys(companyObj).forEach((key) =>
    companyObj[key] === undefined ? delete companyObj[key] : {}
  );

  return await Company.findOneAndUpdate(
    {
      companyID,
    },
    companyObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getCompaniesBy,
  createCompany,
  updateCompany,
};
