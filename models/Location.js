const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

mongoose.model("Location", LocationSchema);
