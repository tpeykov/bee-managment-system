import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {checkIsUserAuthenticated} from "../shared/services/auth.service";


const PublicRoutes = () => {

  return (!checkIsUserAuthenticated() ? <Outlet /> : <Navigate to="/" />)
};

export default PublicRoutes
