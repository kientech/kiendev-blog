import React from "react";
import { useAuth } from "../../../contexts/authContext";
import { NavLink, useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-4 border-b-2 rounded-lg border-gray-200">
      <div className="w-[20%]">
        <NavLink>
          <img src="/images/logo.png" className="w-[50px]" alt="" />
        </NavLink>
      </div>
      <div className="w-[80%] flex justify-end items-center">
        <button
          type="submit"
          className="transition ease-in-out delay-150 bg-gradient-to-r from-[#00B4AA] to-[#A4D96C] h-[70px] w-[200px] rounded-md text-white font-semibold hover:bg-gradient-to-r hover:from-[#A4D96C] hover:to-[#00B4AA]"
          onClick={() => navigate("/manage/add-post")}
        >
          Write new post
        </button>
        <img
          src={userInfo?.photoURL}
          alt=""
          className="w-16 h-16 object-cover rounded-full inline-block ml-4"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
