const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProviderSchema = new Schema(
  {
    providerID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    description: {
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
    acceptingNew: {
      type: Boolean,
    },
    virtualAvailable: {
      type: Boolean,
      required: true,
    },
    reimbursementHandling: {
      type: Boolean,
    },
    insuranceCompaniesCompatible: [
      {
        type: String,
      },
    ],
    servicesCoveredName: [
      {
        type: String,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Provider", ProviderSchema);
