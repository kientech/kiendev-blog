import React from "react";

const FeatureItem = ({ data }) => {
  if (!data || !data.id) {
    return null;
  }

  // Ensure createdAt is a valid object with seconds property
  const date = new Date((data?.createdAt?.seconds ?? Date.now() / 1000) * 1000);
  const formatDate = date.toLocaleDateString("vi-VI");

  return (
    <div className="relative w-full h-[250px]">
      <img
        src={data.image}
        className="w-full h-full object-cover rounded-lg"
        alt={`Feature titled ${data.title}`}
      />
      <div className="absolute top-0 right-0 left-0 p-4">
        <div className="flex justify-between">
          <span className="text-[#00B4AA] py-1 px-2 rounded-lg bg-gray-200 text-sm">
            {data.category?.name || "Blog"}
          </span>
          <div className="flex items-center text-white text-sm">
            <span>{formatDate}</span>
            <span className="text-sm inline-block w-2 h-2 bg-white rounded-full mx-2"></span>
            <span>{data?.user?.fullname}</span>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white mt-8">
            {data.title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
