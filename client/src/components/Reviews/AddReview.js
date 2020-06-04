import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import { submitReview } from "../../actions/reviews";
import MyRating from "../Rating/MyRating";

const AddReview = ({ submitReview, id, setOpen }) => {
  const [Food, setFood] = useState();
  const [Staff, setStaff] = useState();
  const [Bathroom, setBathroom] = useState();
  const [Clean, setClean] = useState();
  const [Delivery, setDelivery] = useState();
  const [Comment, setComment] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    const review = { Food, Staff, Bathroom, Clean, Delivery, id, Comment };
    submitReview(review, id);
    setOpen(false);
    //window.location.reload(); //reload current page after submission
  };

  const commentHandler = (event) => {
    //handler for onChange textarea
    setComment(event.target.value);
  };

  return (
    <Fragment>
      <form onSubmit={submitHandler}>
        <div className="rating">
          <MyRating topic="Food Quality" setter={setFood} />
          <MyRating topic="Staff Kindness" setter={setStaff} />
          <MyRating topic="Bathroom Quality" setter={setBathroom} />
          <MyRating topic="Cleanliness" setter={setClean} />
          <MyRating topic="Delivery Speed" setter={setDelivery} />
          <textarea
            className="textarea"
            placeholder="Add Comment:"
            value={Comment}
            onChange={commentHandler}
            required
          ></textarea>
          <button /*onClick={submitHandler} type="submit"*/>Submit</button>
        </div>
      </form>
    </Fragment>
  );
};
const mapStatToProps = (state) => ({});
export default connect(mapStatToProps, {
  submitReview,
})(AddReview);
