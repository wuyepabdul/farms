import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Farms Nigeria | Online",
  description: "Buy farm produce with ease",
  keywords:
    "farm produce, buy farm produce, cheap farm produce, vegetables, grains, legumes, fruits",
};
export default Meta;
