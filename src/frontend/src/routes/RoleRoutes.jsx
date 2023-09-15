import {getUserDetails} from "../shared/services/auth.service";
import {Navigate, Outlet} from "react-router-dom";
import {USER_ROLES} from "../domain/enums/user-roles.enum";
import React from "react";

const RoleRoutes = (role) => {
    const { auth } = getUserDetails();
    console.log(auth, 123123, role)
    return (auth === role.role ? <Outlet /> : <Navigate to={ auth === USER_ROLES.MERCHANT ? '/manufacturer' : '/merchant' } />)
};

export default RoleRoutes;