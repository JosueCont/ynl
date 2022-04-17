import axios from "axios";
import {getDataObject} from '../utils/functions'
import Constants from "expo-constants";

let config = {
    baseURL: 'https://69fc-2806-10be-9-6201-99c7-6416-5890-20b7.ngrok.io',
    headers: {
        Accept: "application/json",
    },
};

let APIKit = axios.create(config);

APIKit.interceptors.request.use(async function (config) {
    try {
        let token = await getDataObject('@jwt');
        if (token) config.headers.Authorization =`Bearer ${token.jwt}`;
    } catch (e) {}

    return config;
});

APIKit.interceptors.response.use(function (config) {
    return config;
});

export default APIKit;