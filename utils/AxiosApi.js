import axios from "axios";
import {getDataObject} from '../utils/functions'
import Constants from "expo-constants";
const isprod=false
let config = {
    baseURL: isprod?'https://ynl-api.herokuapp.com':'http://localhost:1337',
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