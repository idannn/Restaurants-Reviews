import * as actions from "./actionTypes";

export const getRestaurants = (index) => {
  // creating an action for saga handling
  return {
    type: actions.GET_RESTAURANTS,
    payload: { index },
  };
};

export const getRestaurant = (id) => {
  // creating an action for saga handling
  return {
    type: actions.GET_RESTAURANT,
    payload: { id },
  };
};

export const resetList = () => {
  // creating an action for saga handling
  return {
    type: actions.RESET_LIST,
  };
};
