import axios from "axios";
import {getDataObject} from "../utils/functions"
const isprod = false

export const baseURL = isprod ? 'https://api.ynl.khorplus.com' : 'https://a84e-189-202-188-229.ngrok-free.app';

let config = {
    baseURL:baseURL,
    headers: {
        Accept: "application/json",
    },
};


let APIKit = axios.create(config);

APIKit.interceptors.request.use(async function (config) {
    try {
        // console.log(config.baseURL)
         let token = await getDataObject('@jwt');
         if (token) config.headers.Authorization =`Bearer ${token.jwt}`;
    } catch (e) {
        console.log('APIKit.interceptors.request error =>',e.toString())
    }

    return config;
});

APIKit.interceptors.response.use(function (config) {
    return config;
});

export default APIKit;