const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = mongoose.model("Review");
const Restaurant = mongoose.model("Restaurant");

const axios = require("axios");

// prefix route /reviews/..

// Create a review
router.post("/", async (req, res) => {
  const {
    Food,
    Staff,
    Bathroom,
    Clean,
    Delivery,
    id,
    Comment,
  } = req.body.review;
  try {
    let Avg =
      parseInt(Food) +
      parseInt(Staff) +
      parseInt(Bathroom) +
      parseInt(Clean) +
      parseInt(Delivery);
    Avg = Avg / 5;
    //let floor = Math.floor(Avg);
    const newReview = new Review({
      //add restaurant id ref to the review scheme
      Food,
      Staff,
      Bathroom,
      Clean,
      Delivery,
      Restaurant: id,
      Comment,
      Avg,
    });

    const review = await newReview.save();
    //add the new review to the reviewed restaurant list
    const restaurant = await Restaurant.findById(id);
    restaurant.reviews.unshift(review); //insert the new review to the start of the array
    // adding vote and fixing avrage
    let votes = parseInt(restaurant.user_rating.votes); // adding one the total num of votes
    let rating = parseFloat(restaurant.user_rating.aggregate_rating);
    let total = rating * votes;
    let newAVg = (total + Avg) / (votes + 1);
    restaurant.user_rating.votes++;
    restaurant.user_rating.aggregate_rating = newAVg.toString();
    await restaurant.save();

    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all reviews with the restaurant id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const reviews = await (await Restaurant.findById(id)).populate("reviews");
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// delete review
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findById(id);
    const restaurantId = review.Restaurant._id;
    const restaurant = await Restaurant.findById(restaurantId);
    restaurant.reviews = restaurant.reviews.filter(
      (review) => review._id.toString() !== req.params.id //search for the specifict review using the id
    );
    let votes = parseInt(restaurant.user_rating.votes); // adding one the total num of votes
    if (votes > 1) {
      let rating = parseFloat(restaurant.user_rating.aggregate_rating);
      let total = rating * votes;
      let newAVg = (total - review.Avg) / (votes - 1);
      restaurant.user_rating.aggregate_rating = newAVg.toString();
    } else {
      restaurant.user_rating.aggregate_rating = "0";
    }
    restaurant.user_rating.votes--;
    await restaurant.save(); //save the changes after review delete
    await review.remove(); //remove the review from the collection

    res.json({ id: restaurantId }); //return to the saga the restaurant id for dispatching a new action to update the list
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

module.exports = router;
