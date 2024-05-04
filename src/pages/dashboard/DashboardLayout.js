import React, { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../../components/dashboard/header/DashboardHeader";
import SideBar from "../../components/dashboard/sidebar/SideBar";
import { useAuth } from "../../contexts/authContext";
import PageNotFound from "../PageNotFound";

const DashboardLayout = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const { userInfo } = useAuth();
  if (!userInfo) return <PageNotFound></PageNotFound>;
  return (
    <Fragment>
      <DashboardHeader></DashboardHeader>
      <div className="flex flex-row">
        <SideBar></SideBar>
        <Outlet></Outlet>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
