import React from "react";
import FeatureItem from "./FeatureItem";

const FeatureList = () => {
  const items = [1, 2, 3];
  return (
    <div className="my-8">
      <span className="w-20 h-2 my-2 inline-block rounded-md bg-gradient-to-r from-[#00B4AA] to-[#A4D96C]"></span>
      <h1 className="text-3xl font-bold mb-6">Features</h1>
      <div className="grid grid-cols-3 gap-8 ">
        {items.map((item) => (
          <FeatureItem></FeatureItem>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;
