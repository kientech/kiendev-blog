import React from "react";
import { useAuth } from "../../contexts/authContext";

const Banner = () => {
  const { userInfo } = useAuth();
  return (
    <>
      <div className="bg-gradient-to-r from-[#00B4AA] to-[#A4D96C] h-[520px] rounded-lg flex flex-row items-center justify-between p-20">
        <div className="max-w-[450px]">
          {!userInfo ? (
            <h1 className="font-bold text-4xl text-white mb-10">
              KienDev Blogging
            </h1>
          ) : (
            <h1 className="font-bold text-4xl text-white mb-10">
              Welcome back, {userInfo.displayName}
            </h1>
          )}
          <p className="text-white mb-9">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. In
            quisquam, quae, quos reiciendis voluptatem illum delectus quam
            consectetur cum non possimus impedit tenetur libero eaque vel ex
            quasi explicabo expedita.
          </p>
          {!userInfo ? (
            <button
              onClick={() => console.log("get started")}
              className="transition ease-in-out delay-150  py-4 px-12 rounded-md font-semibold bg-white text-[#00B4AA]"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={() => console.log("get started")}
              className="transition ease-in-out delay-150  py-4 px-12 rounded-md font-semibold bg-white text-[#00B4AA]"
            >
              Create new post
            </button>
          )}
        </div>
        <div>
          <img src="/images/banner-img.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Banner;
