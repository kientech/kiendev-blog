import React from "react";
import "../../src/index";
import Banner from "../components/banner/Banner";
import FeatureList from "../components/feature/FeatureList";
import NewestList from "../components/newest/NewestList";

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
