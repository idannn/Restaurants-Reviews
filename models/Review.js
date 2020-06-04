const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  Restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  Date: {
    type: Date,
    default: Date.now,
  },

  Food: {
    type: String,
    required: true,
  },
  Staff: {
    type: String,
    required: true,
  },
  Bathroom: {
    type: String,
    required: true,
  },
  Clean: {
    type: String,
    required: true,
  },
  Delivery: {
    type: String,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
  Avg: {
    type: Number,
    required: true,
  },

  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
});

mongoose.model("Review", ReviewSchema);
