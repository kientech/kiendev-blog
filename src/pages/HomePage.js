import React from "react";
import "../../src/index";
import Banner from "../components/banner/Banner";
import FeatureList from "../components/feature/FeatureList";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <FeatureList></FeatureList>
    </>
  );
};

export default HomePage;
