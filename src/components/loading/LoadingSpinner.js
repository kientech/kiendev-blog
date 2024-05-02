import React from "react";

const LoadingSpinner = ({ className }) => {
  return (
    <div
      className={`w-[40px] h-[40px] rounded-full border-4 border-white border-x-transparent animate-spin ${className}`}
    ></div>
  );
};

export default LoadingSpinner;
