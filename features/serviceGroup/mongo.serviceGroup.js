const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceGroupSchema = new Schema(
  {
    serviceGroupID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    percentageCovered: {
      type: Number,
      required: true,
    },
    maxLifetime: {
      type: Number,
    },
    maxCombined: {
      type: Number,
      required: true,
    },
    timePeriod: {
      type: Number,
    },
    waitPeriodBetweenVisits: {
      type: Number,
    },
    insurancePlan: {
      type: String,
      required: true,
    },
    services: [
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

module.exports = mongoose.model("ServiceGroup", ServiceGroupSchema);
