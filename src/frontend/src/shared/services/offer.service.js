import axios from "axios";
import {API_URL_FULL} from "../constants";
import {getAuthToken} from "./auth.service";

export const createOffer = (data) => {
    return axios.post(`${API_URL_FULL}/offers`, {
        'posterUuid': data.posterUuid,
        'price': `${data.price}`,
        'amount': `${data.amount}`,
        'description': `${data.description}`
    }, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        }
    });
};

export const changeOffer = (uuid,status) => {
    // status: declined, approved, initial

    return axios.put(`${API_URL_FULL}/offers/${uuid}?status=${status}`, {}, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        }
    });
};