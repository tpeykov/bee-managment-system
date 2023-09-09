import axios from "axios";
import {API_URL_FULL} from "../constants";

export const loginUser = (data) => {
    return axios({
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json',
        },
        url: `${API_URL_FULL}/authenticate`,
        data: { uic: data.get('uic'), password: data.get('password') }
    });
};

export const registerUser = (data) => {
    return axios({
        method: 'post',
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-Type": 'application/json'
        },

        url: `${API_URL_FULL}/register`,
        data: {
            username: data.get('username'),
            email: data.get('email'),
            uic: data.get('uic'),
            password: data.get('password'),
        }
    })
}
