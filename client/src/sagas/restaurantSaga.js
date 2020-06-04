import { put, all, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import axios from "axios";

function* getRestaurants(action) {
  //const body = JSON.stringify(action.payload);
  const index = action.payload.index;
  try {
    const res = yield axios.get(`/restaurants/?index=${index}`); //add data with query
    if (res.status === 200) {
      yield put({ type: actions.UPDATE_LIST, payload: res.data });
    } else throw res.error;
  } catch (error) {
    console.log(error);
  }
}

function* getRestaurant(action) {
  //const body = JSON.stringify(action.payload);
  try {
    const res = yield axios.get(`/restaurants/${action.payload.id}`);
    if (res.status === 200) {
      //console.log(res.data.location.city);
      yield put({ type: actions.UPDATE_RESTAURANT, payload: res.data });
    } else throw res.error;
  } catch (error) {
    console.log(error);
  }
}
export default function* restaurantSagas() {
  yield all([takeEvery(actions.GET_RESTAURANTS, getRestaurants)]);
  yield all([takeEvery(actions.GET_RESTAURANT, getRestaurant)]);
}
