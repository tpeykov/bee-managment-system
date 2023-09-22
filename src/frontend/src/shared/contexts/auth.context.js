import {createContext} from "react";
import {checkIsUserAuthenticated, getUserRole, getUserUsername, getUserUuid} from "../services/auth.service";

export const AuthDefaults = {
    isAuthenticated: checkIsUserAuthenticated(),
    user: {
        uuid: getUserUuid(),
        role: getUserRole(),
        username: getUserUsername()
    },
};

const AuthContext = createContext(AuthDefaults);

export default AuthContext;