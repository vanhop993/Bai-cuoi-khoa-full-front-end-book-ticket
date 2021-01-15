import React from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import Loading from "../Components/Loading";
import Footer from "../Container/Footer";
import Header from "../Container/Header";
import { displayLoading } from "../Redux/Action/LoadingAction";

export const HeaderFooterTemplate = (props) => {
  let { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <Header />
            <Loading />
            <div className="show-hide-loading">
              <Component {...propsRoute} />
              <Footer />
            </div>
          </>
        );
      }}
    />
  );
};
