import React from "react";
import { NavLink } from "react-router-dom";
import slugify from "slugify";

const FeatureItem = ({ data }) => {
  if (!data || !data.id) return null;
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <div className="relative w-full h-[250px]">
      <img
        src={data.image}
        className="w-full h-full object-cover rounded-lg"
        alt=""
      />
      <div className="absolute top-0 right-0 left-0 p-4">
        <div className="flex justify-between">
          <NavLink to={slugify(data.category.toLowerCase())}>
            <span className="text-[#00B4AA] py-1 px-2 rounded-lg bg-gray-200 text-sm">
              {data.category}
            </span>
          </NavLink>
          <div className="flex items-center text-white text-sm">
            <span>{formatDate}</span>
            <span className=" text-sm inline-block w-2 h-2 bg-white rounded-full mx-2"></span>
            <NavLink to={slugify(data.username, { lower: true })}>
              <span>{data.username ? data.username : "Kien Duong Trung"}</span>
            </NavLink>
          </div>
        </div>
        <div>
          <NavLink to={data.slug}>
            <h1 className="text-xl font-semibold text-md text-white mt-8">
              {data.title}
            </h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
