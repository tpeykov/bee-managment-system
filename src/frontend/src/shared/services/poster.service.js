import axios from "axios";
import {API_URL_FULL} from "../constants";
import {getAuthToken} from "./auth.service";

export const createPoster = (data) => {
    return axios.post(`${API_URL_FULL}/posters`, data, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
        }
    });
};


export const retrieveAllPosters = () => {
    return axios.get(`${API_URL_FULL}/posters`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        }
    });
}


export const getPoster = (uuid) => {
    return axios.get(`${API_URL_FULL}/posters/${uuid}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        }
    });
}