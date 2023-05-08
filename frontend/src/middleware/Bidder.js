import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Bidder = () => {
  const auth = getAuthUser();
  return <>{auth && auth.type === 'bidder' ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Bidder;
