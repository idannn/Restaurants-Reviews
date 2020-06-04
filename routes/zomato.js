const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const axios = require("axios");

// prefix route /restaurants/..

//import data from zomatoAPI to the database using postman
router.get("/", async (req, res) => {
  try {
    const uri = encodeURI(
      //change lat and lon for a specific city       //start=? is the offset in the whole list
      "https://developers.zomato.com/api/v2.1/search?start=0&lat=40.7128&lon=-74.0060"
    );
    const headers = {
      "user-key": "7228bb3f0f7901ca774cda21dce13439",
    };

    const getRestaurants = await axios.get(uri, { headers });
    const restaurants = getRestaurants.data.restaurants;
    restaurants.map(async (res) => {
      let name = res.restaurant.name; //names need to be same as in the api
      let cuisines = res.restaurant.cuisines; //names need to be same as in the api
      let location = res.restaurant.location;
      let price_range = res.restaurant.price_range;
      let user_rating = res.restaurant.user_rating;
      let thumb = res.restaurant.thumb;
      let photos = res.restaurant.photos;
      let photos_array = [];
      //const { address, city } = location;
      try {
        const restaurant = new Restaurant({
          //names need to be same as in the scheme
          name,
          cuisines,
          location,
          price_range,
          user_rating,
          thumb,
          photos_array,
        });

        await restaurant.save();
      } catch (err) {
        console.error(err.message);
      }
    });
    return res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "error" });
  }
});

module.exports = router;
