const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    companies: [
      {
        type: String,
      },
    ],
    insurancePlans: [
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
