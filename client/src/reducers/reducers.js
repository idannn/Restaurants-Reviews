import { combineReducers } from "redux";

//list of all reducers
import restaurants from "./restaurants";
import reviews from "./reviews";

export default combineReducers({
  restaurants,
  reviews,
});
