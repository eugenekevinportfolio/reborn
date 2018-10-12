import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers/index.js";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { Provider } from 'react-redux/src';

const middleware = applyMiddleware(thunk, logger);
// DEV
const store = createStore(allReducers, middleware);

// PRODUCTION
// const store = createStore(allReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

export default store;
