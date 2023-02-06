const userDatabase = require("./mongo.user");

async function getUserBy(filter) {
  Object.keys(filter).forEach((key) =>
    filter[key] === undefined ? delete filter[key] : {}
  );

  return await userDatabase.findOne(filter);
}

async function createUser(userObj) {
  Object.keys(userObj).forEach((key) =>
    userObj[key] === undefined ? delete userObj[key] : {}
  );

  var doc = new userDatabase(userObj);

  doc.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("Document inserted succussfully!");
  });

  return doc;
}

async function updateUser(uid, userObj) {
  Object.keys(userObj).forEach((key) =>
    userObj[key] === undefined ? delete userObj[key] : {}
  );

  return await userDatabase.findOneAndUpdate(
    {
      uid,
    },
    userObj,
    {
      new: true,
    }
  );
}

module.exports = {
  getUserBy,
  createUser,
  updateUser,
};
