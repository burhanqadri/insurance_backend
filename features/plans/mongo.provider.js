const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reimbursementHandling: {
    type: String,
    required: true,
  },
  serviceCovered: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceCovered",
    },
  ],
});

module.exports = mongoose.model("Provider", ProviderSchema);
