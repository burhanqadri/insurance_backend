const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceTypeSchema = new Schema(
  {
    serviceTypeID: {
      type: String,
      required: true,
    },
    names: [
      {
        type: String,
      },
    ],
    maxPerVisit: {
      type: Number,
    },
    notes: [
      {
        type: String,
      },
    ],
    serviceCovered: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceType", ServiceTypeSchema);
