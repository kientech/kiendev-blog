import React, { useState } from "react";

const Toggle = () => {
  // State to manage toggle
  const [isActive, setIsActive] = useState(false);

  // Toggle function
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className="w-[100px] h-[50px] p-[5px] bg-gray-300 rounded-full flex items-center justify-start cursor-pointer transition-all"
      onClick={handleToggle}
    >
      <div
        className={`w-[40px] h-[40px] bg-white rounded-full transition-transform ${
          isActive ? "translate-x-[50px] bg-green-500" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default Toggle;
