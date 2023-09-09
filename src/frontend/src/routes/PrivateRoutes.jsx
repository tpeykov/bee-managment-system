import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {checkIsUserAuthenticated} from "../shared/services/auth.service";

const PrivateRoutes = () => {

  return (checkIsUserAuthenticated() ? <Outlet /> : <Navigate to="/login" />)
};

export default PrivateRoutes
