const mongoose = require("mongoose");
const Review = require("./Review");

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cuisines: {
    type: String,
    required: true,
  },

  location: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  price_range: {
    type: Number,
    required: true,
  },
  user_rating: {
    aggregate_rating: {
      type: String,
      required: true,
    },
    rating_text: {
      type: String,
      required: true,
    },
    votes: {
      type: String,
      required: true,
    },
  },
  thumb: {
    type: String,
    required: true,
  },
  photos_array: {
    type: [String],
    required: true,
  },
  reviews: [Review], // array of Review Scheme model
});

mongoose.model("Restaurant", RestaurantSchema);
