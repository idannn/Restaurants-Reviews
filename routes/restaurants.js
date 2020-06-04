const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Restaurant = mongoose.model("Restaurant");
const axios = require("axios");

// prefix route /restaurants/..

router.get("/", async (req, res) => {
  try {
    //console.log("api call");
    const index = req.query.index; //example: http://localhost:3000/restaurants?count=15
    const restaurants = await Restaurant.find().skip(parseInt(index)).limit(10);
    res.json(restaurants);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
