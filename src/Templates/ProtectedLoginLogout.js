import React from "react";
import { Route, Redirect } from "react-router-dom";
export function ProtectedLoginLogout({
  user,
  Component,
  children,
  path,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location, match }) => {
        if (!user) {
          return (
            <>
              <Component match={match} />
            </>
          );
        }
        if (user) {
          return (
            <Redirect
              to={{
                pathname: "/",
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
