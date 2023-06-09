import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Seller = () => {
  const auth = getAuthUser();
  return <>{auth && auth.type === 'seller' ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default Seller;
