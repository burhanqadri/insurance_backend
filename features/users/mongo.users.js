const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  company: [
    {
      type: String,
    },
  ],
  insurancePlan: [
    {
      type: String,
    },
  ],
  claims: [
    {
      type: String,
    },
  ],
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
