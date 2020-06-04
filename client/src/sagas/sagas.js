import { all } from "redux-saga/effects";
import restaurantSagas from "./restaurantSaga";
import reviewSagas from "./reviewSaga";

//combine all sagas

export default function* Sagas() {
  yield all([restaurantSagas(), reviewSagas()]);
}
