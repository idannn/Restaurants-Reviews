import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRestaurant } from "../../actions/restaurants";
import { getReviews } from "../../actions/reviews";
import { deleteReview } from "../../actions/reviews";
import { resetList } from "../../actions/restaurants";

import Modal from "react-modal";
import AddReview from "../Reviews/AddReview";
import RestaurantCard from "./RestaurantCard";
import Review from "../Reviews/Review";

const customStyles = {
  //for modal styling
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const RestaurantDetails = ({
  restaurant,
  reviews,
  getRestaurant,
  getReviews,
  resetList,
  deleteReview,
  match,
}) => {
  const [open, setOpen] = useState(false);
  const id = match.params.id;

  useEffect(() => {
    getRestaurant(id);
    //getReviews(id); //(react-router object: using match we can get data from the url
  }, [getRestaurant /*getReviews*/, id]); //useEffect will be execute on every change of the dependency list

  useEffect(() => {
    //go to the top of the page
    resetList();
    window.scrollTo(0, 0);
  }, [resetList]);

  return (
    <Fragment>
      {restaurant === null ? null : (
        <Fragment>
          <RestaurantCard restaurant={restaurant} />

          <div className="gallery">
            {restaurant.photos_array.slice(0, 6).map((img) => (
              <img
                key={img}
                src={img}
                alt=""
                //onLoad={() => console.log("loading")}
                className="rest-img"
              />
            ))}
          </div>
          <div>
            <button className="modal-button" onClick={() => setOpen(true)}>
              Add Review
            </button>
          </div>
          <Modal
            style={customStyles}
            isOpen={open}
            onRequestClose={() => setOpen(false)}
            ariaHideApp={false}
          >
            <div className="add-review">
              <AddReview id={match.params.id} setOpen={setOpen} />{" "}
            </div>
            {/* content of the modal*/}
            <button onClick={() => setOpen(false)}>Cancel</button>
          </Modal>
          {restaurant.reviews === null
            ? null
            : restaurant.reviews.map((review) => (
                <Fragment key={review._id}>
                  <Review
                    review={review}
                    rating={restaurant.user_rating}
                    deleteReview={deleteReview}
                  />
                  <br></br>
                </Fragment>
              ))}
        </Fragment>
      )}
    </Fragment>
  );
};
const mapStatToProps = (state) => ({
  restaurant: state.restaurants.restaurant,
  //reviews: state.reviews.reviews, -->
  // insted of calling to ADD_REVIEW action after adding review we dispatch action to get the whole restaurant due to other changes
});
export default connect(mapStatToProps, {
  getRestaurant,
  getReviews,
  deleteReview,
  resetList,
})(RestaurantDetails);
