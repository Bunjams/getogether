import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { User } from "types/model/user";

const AccountSetup = () => {
  let user = JSON.parse(localStorage.getItem("authUser") || "{}") as User;

  return user?.access ? <Outlet /> : <Navigate to="/login" />;
};

export default AccountSetup;
