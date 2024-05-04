import React from "react";
import "../../../src/index";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { UilSearch } from "@iconscout/react-unicons";

const navigation = [
  {
    id: 1,
    url: "/",
    name: "Home",
  },
  {
    id: 2,
    url: "/blog",
    name: "Blog",
  },
  {
    id: 3,
    url: "/contact",
    name: "Contact",
  },
];

const Header = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="container py-10 flex flex-row items-center justify-between">
      <div>
        <div className="flex flex-row items-center">
          <NavLink to="/">
            <img
              src="/images/logo.png"
              alt="KienDev Logo"
              className="w-[50px] object-cover"
            />
          </NavLink>
          <div>
            {navigation.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-[#00B4AA] font-bold" : ""
                }
                style={{
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
                key={item.name}
                to={item.url}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search post..."
            className="px-2 pr-6 py-4 outline-none rounded-md w-[300px] border border-[#CFCFCF] focus:border-[#00B4AA]"
          />
          <UilSearch
            size={16}
            className="absolute top-2/4 right-2 -translate-y-2/4 text-[#CFCFCF]"
          ></UilSearch>
        </div>
        {!userInfo ? (
          <button
            onClick={() => navigate("sign-up")}
            className="transition ease-in-out delay-150 bg-gradient-to-r from-[#00B4AA] to-[#A4D96C] py-4 px-9 rounded-md ml-6 text-white font-semibold hover:bg-gradient-to-r hover:from-[#A4D96C] hover:to-[#00B4AA]"
          >
            Sign up
          </button>
        ) : (
          <button
            onClick={() => navigate("/dashboard")}
            className="transition ease-in-out delay-150 bg-gradient-to-r from-[#00B4AA] to-[#A4D96C] py-4 px-9 rounded-md ml-6 text-white font-semibold hover:bg-gradient-to-r hover:from-[#A4D96C] hover:to-[#00B4AA]"
          >
            Dashboard
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
