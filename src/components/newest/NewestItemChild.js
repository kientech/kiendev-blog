import React from "react";

const NewestItemChild = () => {
  return (
    <div className="flex items-center justify-between">
      <img
        src="/images/work-room-01.png"
        className="w-[180px] h-[130px] object-cover rounded-lg"
        alt=""
      />
      <div className="p-4">
        <div className="">
          <span className="text-[#00B4AA] py-1 px-2 rounded-lg bg-gray-200 text-sm">
            Web Development
          </span>
        </div>
        <div>
          <h1 className="font-semibold text-md text-black my-2">
            Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
          </h1>
        </div>
        <div className="flex items-center text-black text-sm">
          <span>Mar 23</span>
          <span className=" text-sm inline-block w-2 h-2 bg-black rounded-full mx-2"></span>
          <span>Kien Duong</span>
        </div>
      </div>
    </div>
  );
};

export default NewestItemChild;
