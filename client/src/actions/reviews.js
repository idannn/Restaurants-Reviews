import * as actions from "./actionTypes";

export const submitReview = (review, id) => {
  // creating an action for saga handling
  return {
    type: actions.SUBMIT_REVIEW,
    payload: { review, id },
  };
};

export const getReviews = (id) => {
  // creating an action for saga handling
  return {
    type: actions.GET_REVIEWS,
    payload: { id },
  };
};

export const deleteReview = (id, restaurantId) => {
  // creating an action for saga handling
  return {
    type: actions.DELETE_REVIEW,
    payload: { id, restaurantId },
  };
};
