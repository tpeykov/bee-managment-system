import axios from "axios";
import {API_URL_FULL} from "../constants";
import {getAuthToken} from "./auth.service";

export const createPoster = (data) => {
   return axios.post(`${API_URL_FULL}/poster`, {
        'title': `${data.title}`, 'description': `${data.description}`, 'price': `${data.price}`
    }, {
        headers: {
            Authorization: 'Bearer ' + getAuthToken(),
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
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