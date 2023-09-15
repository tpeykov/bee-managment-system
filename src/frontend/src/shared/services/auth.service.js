import jwt_decode from "jwt-decode";
import {JWT_LOCAL_STORAGE_KEY} from "../constants";

export const getAuthToken = () => localStorage.getItem(JWT_LOCAL_STORAGE_KEY);

export const storeAuthToken = (token) => {
    localStorage.setItem(JWT_LOCAL_STORAGE_KEY, token);
};

export const removeAuthToken = () => localStorage.removeItem(JWT_LOCAL_STORAGE_KEY);

export const checkIsUserAuthenticated = () => {
    const token = localStorage.getItem(JWT_LOCAL_STORAGE_KEY);
    if (token === null) return false;

    const decoded = jwt_decode(token);
    const currentTimeInSeconds = (new Date()).getTime() / 1000;

    return currentTimeInSeconds < decoded.exp;
};

export const getUserDetails = () => {
    return jwt_decode(getAuthToken());
}