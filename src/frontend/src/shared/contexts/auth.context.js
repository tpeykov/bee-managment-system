import {createContext} from "react";
import {checkIsUserAuthenticated, getUserRole, getUserUuid} from "../services/auth.service";

export const AuthDefaults = {
    isAuthenticated: checkIsUserAuthenticated(),
    user: {
        uuid: getUserUuid(),
        role: getUserRole()
    },
};

const AuthContext = createContext(AuthDefaults);

export default AuthContext;