import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components for routes
import Restaurants from "./components/Restaurants/Restaurants";
import RestaurantDetails from "./components/Restaurants/RestaurantDetails";

import "./App.css"; //import CSS

//redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Restaurants} />
            <Route
              exact
              path="/restaurants/:id"
              component={RestaurantDetails}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
