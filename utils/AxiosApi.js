import axios from "axios";
import {getDataObject} from "../utils/functions"
export const isprod = true
export const isDev = false

export const baseURL = isprod ? 'https://api.ynl.khorplus.com' :  isDev ? 'https://apisl.ynl.hiumanlab.com' : "https://3e3b-200-110-107-2.ngrok-free.app"


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