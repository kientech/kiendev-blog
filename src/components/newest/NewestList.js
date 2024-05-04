import React from "react";
import NewestItemLatest from "./NewestItemLatest";
import NewestItemChild from "./NewestItemChild";

const NewestList = () => {
  return (
    <div className="my-8">
      <span className="w-20 h-2 my-2 inline-block rounded-md bg-gradient-to-r from-[#00B4AA] to-[#A4D96C]"></span>
      <h1 className="text-3xl font-bold mb-6">Newest Update</h1>

      <div className="grid grid-cols-2 gap-4 rounded-lg">
        <NewestItemLatest></NewestItemLatest>
        <div className="bg-[#F3EDFF] rounded-lg px-4 flex flex-col justify-around">
          {[1, 2, 3, 4].map((item) => (
            <NewestItemChild key={item}></NewestItemChild>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewestList;
