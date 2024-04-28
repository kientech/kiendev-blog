import React from "react";

const NewestItemLatest = () => {
  return (
    <div>
      <img src="/images/work-room-01.png" className="rounded-lg" alt="" />
      <div className="p-4">
        <div className="">
          <span className="text-[#00B4AA] py-1 px-2 rounded-lg bg-gray-200 text-sm">
            Web Development
          </span>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-md text-black my-2">
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

export default NewestItemLatest;
