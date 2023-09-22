import axios from "axios";
import {API_URL_FULL} from "../constants";
import {getAuthToken} from "./auth.service";

export const createOffer = (data) => {
    return axios.post(`${API_URL_FULL}/offers`, data, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'multipart/form-data',
        }
    });
};

export const changeOffer = (uuid, status) => {
    // status: declined, approved, initial

    return axios.put(`${API_URL_FULL}/offers/${uuid}?status=${status}`, {}, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        }
    });
};