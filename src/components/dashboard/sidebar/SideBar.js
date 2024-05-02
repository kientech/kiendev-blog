import React from "react";
import { NavLink } from "react-router-dom";
import { UilEstate } from "@iconscout/react-unicons";
import { UilBookOpen } from "@iconscout/react-unicons";
import { UilBookmark } from "@iconscout/react-unicons";
import { UilArchive } from "@iconscout/react-unicons";
import { UilUsersAlt } from "@iconscout/react-unicons";
import { UilSignout } from "@iconscout/react-unicons";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

const sideBarNav = [
  {
    id: 0,
    icon: <UilEstate></UilEstate>,
    url: "/dashboard",
    name: "Dashboard",
  },
  {
    id: 1,
    icon: <UilBookOpen></UilBookOpen>,
    url: "/manage/add-post",
    name: "Post",
  },
  {
    id: 2,
    icon: <UilBookmark></UilBookmark>,
    url: "/manage/add-category",
    name: "Category",
  },
  {
    id: 3,
    icon: <UilArchive></UilArchive>,
    url: "/manage/categories",
    name: "Categories",
  },
  {
    id: 4,
    icon: <UilUsersAlt></UilUsersAlt>,
    url: "/manage/users",
    name: "Users",
  },
  {
    id: 5,
    icon: <UilSignout></UilSignout>,
    url: "/",
    name: "Logout",
    onClick: () => signOut(auth),
  },
];

const SideBar = () => {
  return (
    <div className="w-[25%] max-h-[520px]  my-9 flex-col justify-center items-center shadow-md rounded-lg">
      {sideBarNav.map((item) => {
        if (item.onClick)
          return (
            <NavLink
              to={item.url}
              key={item.id}
              onClick={item.onClick}
              className={({ isActive }) =>
                `my-2 group flex transition-all items-center py-6 px-2 hover:bg-[#F1FBF7] ${
                  isActive ? "text-[#1DC071] bg-[#F1FBF7]" : ""
                }`
              }
            >
              <span className="text-black transition-all px-2 group-hover:text-[#1DC071] ">
                {item.icon}
              </span>
              <span className="text-lg font-semibold group-hover:text-[#1DC071] transition-all">
                {item.name}
              </span>
            </NavLink>
          );

        return (
          <NavLink
            to={item.url}
            key={item.id}
            className={({ isActive }) =>
              `my-2 group flex transition-all items-center py-6 px-2 hover:bg-[#F1FBF7] ${
                isActive ? "text-[#1DC071] bg-[#F1FBF7]" : ""
              }`
            }
          >
            <span className="text-black transition-all px-2 group-hover:text-[#1DC071] ">
              {item.icon}
            </span>
            <span className="text-lg font-semibold group-hover:text-[#1DC071] transition-all">
              {item.name}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default SideBar;
