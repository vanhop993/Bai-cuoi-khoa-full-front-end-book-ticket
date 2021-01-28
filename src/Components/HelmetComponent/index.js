import React from "react";
import { Helmet } from "react-helmet";

export default function HelmetComponent({ title, description }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </div>
  );
}
