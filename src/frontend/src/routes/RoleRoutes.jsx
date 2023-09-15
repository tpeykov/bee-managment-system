import {getUserDetails} from "../shared/services/auth.service";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {USER_ROLES} from "../domain/enums/user-roles.enum";

const RoleRoutes = (role: USER_ROLES) => {
    const { auth } = getUserDetails();
    return (auth === role ? <Outlet /> : <Navigate to="/" />)
};

export default RoleRoutes;