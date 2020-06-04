import React, { Fragment } from "react";
import Rating from "@material-ui/lab/Rating";

const Review = ({ review, deleteReview, rating }) => {
  const handleDelete = () => {
    deleteReview(review._id, review.Restaurant);
  };
  //rating properties : user_rating , votes
  return (
    <Fragment>
      <div className="review">
        <div className="item">
          <Rating
            className="review-rating"
            name="topic"
            value={review.Avg}
            readOnly
          />
          <div className="data">
            <label>
              {review.Date.slice(0, 10)} {review.Date.slice(11, 19)}
            </label>
          </div>
        </div>
        <div className="comment">
          <p className="break">{review.Comment}</p>
          <button className="delete-bt" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Review;
