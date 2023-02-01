const mongoose = require("mongoose");

const ServiceCoveredSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  maximum: {
    type: Number,
    required: true,
  },
  timePeriod: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
});

const ServiceCovered = mongoose.model("ServiceCovered", ServiceCoveredSchema);
module.exports = ServiceCovered;
