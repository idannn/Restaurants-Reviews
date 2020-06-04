import * as actions from "../actions/actionTypes";

const initialState = {
  reviews: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_REVIEWS:
      return {
        ...state,
        reviews: payload.reviews,
      };
    case actions.ADD_REVIEW: //add last added review to the list
      return {
        ...state,
        reviews: [payload, ...state.reviews], //add last review to the list as the first item
      };

    default:
      return state;
  }
}
