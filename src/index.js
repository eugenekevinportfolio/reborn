import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers/index.js";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { Provider } from "react-redux/src";
import Article from "./components/Article";

// DEV
// const middleware = applyMiddleware(thunk, logger);
// const store = createStore(allReducers, middleware);

// PRODUCTION
const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/articles/:id" component={Article} />
        <Route component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

export default store;
