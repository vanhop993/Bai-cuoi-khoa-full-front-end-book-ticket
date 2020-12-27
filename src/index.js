import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import '../node_modules/jquery';
// cấu hình redux
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./Redux/Reducers/rootReducer";
// cấu hình router
import { Router } from "react-router-dom";

import reduxThunk from "redux-thunk";
import ScrollToTop from "./Components/ScrollTopReactRoute/ScrollTopReactRoute";

import { history } from "./Util/History";
import ScrollSpy from "./Components/ScrollSpy";

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <ScrollToTop />
      <ScrollSpy />
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
