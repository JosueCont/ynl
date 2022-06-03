import axios from "axios";
import {getDataObject} from "../utils/functions"
const isprod = true

export const baseURL = isprod ? 'https://ynl-api.herokuapp.com' : 'http://localhost:1337';

let config = {
    baseURL:baseURL,
    headers: {
        Accept: "application/json",
    },
};


let APIKit = axios.create(config);

APIKit.interceptors.request.use(async function (config) {
    try {

        console.log(config.baseURL)
         let token = await getDataObject('@jwt');
         if (token) config.headers.Authorization =`Bearer ${token.jwt}`;
    } catch (e) {
        console.log(e)
    }

    return config;
});

APIKit.interceptors.response.use(function (config) {
    return config;
});

export default APIKit;