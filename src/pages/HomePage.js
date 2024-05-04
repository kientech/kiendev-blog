import React from "react";
import "../../src/index";
import Banner from "../components/banner/Banner";
import NewestList from "../components/newest/NewestList";
import FeatureList from "../components/feature/FeatureList";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <FeatureList></FeatureList>
      <NewestList></NewestList>
    </>
  );
};

export default HomePage;
