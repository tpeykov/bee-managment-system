import { createContext } from "react";
import { checkIsUserAuthenticated } from "../services/auth.service";

export const AuthDefaults = {
    isAuthenticated: checkIsUserAuthenticated(),
    user: {},
};

const AuthContext = createContext(AuthDefaults);

export default AuthContext;