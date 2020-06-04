import { put, all, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import axios from "axios";

function* submitReview(action) {
  //const body = JSON.stringify(action.payload);
  try {
    const res = yield axios.post("/reviews/", action.payload);
    if (res.status === 200) {
      //yield put({ type: actions.ADD_REVIEW, payload: res.data }); //dispatch action to update the restaurant cats
      yield put({
        type: actions.GET_RESTAURANT,
        payload: { id: action.payload.id },
      }); //after adding a new review dispatch a action to render to updated data of the restaurant
    } else throw res.error;
  } catch (error) {
    console.log(error);
  }
}

function* getReview(action) {
  //const body = JSON.stringify(action.payload);
  try {
    const res = yield axios.get(`/reviews/${action.payload.id}`);
    if (res.status === 200) {
      yield put({ type: actions.ADD_REVIEWS, payload: res.data });
    } else throw res.error;
  } catch (error) {
    console.log(error);
  }
}
function* deleteReview(action) {
  //const body = JSON.stringify(action.payload);
  try {
    const res = yield axios.delete(`/reviews/${action.payload.id}`); //id of the review to delete
    if (res.status === 200) {
      yield put({
        type: actions.GET_RESTAURANT,
        payload: { id: action.payload.restaurantId },
      });
    } else throw res.error;
  } catch (error) {
    console.log(error);
  }
}
export default function* reviewSagas() {
  yield all([takeEvery(actions.SUBMIT_REVIEW, submitReview)]);
  yield all([takeEvery(actions.GET_REVIEWS, getReview)]);
  yield all([takeEvery(actions.DELETE_REVIEW, deleteReview)]);
}
