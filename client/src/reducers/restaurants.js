import * as actions from "../actions/actionTypes";

const initialState = {
  rest: [],
  restaurant: null,
  first: true, //if this is the first load of the restaurant list - if true useEffect will fetch items
  index: 0, //keep tracking the index of current total items in scrolling
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.UPDATE_LIST:
      return {
        ...state,
        rest: state.rest.concat(payload), //adding the next 10 restaurant
        first: false,
        index: state.index + 10,
      };
    case actions.UPDATE_RESTAURANT:
      return {
        ...state,
        restaurant: payload,
      };
    case actions.RESET_LIST: //reset the whole list when going back from restaurant details page
      return {
        ...state,
        first: true,
        index: 0,
        rest: [],
      };
    default:
      return state;
  }
}
