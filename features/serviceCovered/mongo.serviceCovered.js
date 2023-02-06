const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceCoveredSchema = new Schema(
  {
    serviceCoveredID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    percentageCovered: { type: Number, required: true },
    maxAmount: Number,
    maxVisits: Number,
    maxUnits: Number,
    unitMinutesSize: Number,
    timePeriod: { type: Number, required: true },
    serviceGroup: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceCovered", ServiceCoveredSchema);
