const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceGroupSchema = new Schema({
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
  maxCombined: {
    type: Number,
    required: true,
  },
  timePeriod: {
    type: Number,
    required: true,
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
});

module.exports = mongoose.model("ServiceGroup", ServiceGroupSchema);
