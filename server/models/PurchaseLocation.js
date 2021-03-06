const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PurchaseLocationSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: false
  },
  globalID: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
});

module.exports = PurchaseLocation = mongoose.model(
  "purchaseLocations",
  PurchaseLocationSchema
);
