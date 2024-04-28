import React from "react";

const FeatureItem = () => {
  return (
    <div className="relative w-full h-[250px]">
      <img
        src="/images/work-room.jpeg"
        className="w-full h-full object-cover rounded-lg"
        alt=""
      />
      <div className="absolute top-0 right-0 left-0 p-4">
        <div className="flex justify-between">
          <span className="text-[#00B4AA] py-1 px-2 rounded-lg bg-gray-200 text-sm">
            Web Development
          </span>
          <div className="flex items-center text-white text-sm">
            <span>Mar 23</span>
            <span className=" text-sm inline-block w-2 h-2 bg-white rounded-full mx-2"></span>
            <span>Kien Duong</span>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-md text-white mt-8">
            Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
