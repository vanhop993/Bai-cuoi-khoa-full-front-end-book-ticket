import React from "react";
import { Route, Redirect } from "react-router-dom";
import Loading from "../Components/Loading";
import Footer from "../Container/Footer";
import Header from "../Container/Header";

export function ProtectedRoute({ user, Component, children, path, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location, match }) => {
        if (user) {
          return (
            <>
              <Header />
              <Loading />
              <Component match={match} />
              <Footer />
            </>
          );
        }
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: "/dangnhap",
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}
