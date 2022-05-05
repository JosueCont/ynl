import axios from "axios";

const isprod = true
let config = {
    baseURL: isprod ? 'https://ynl-api.herokuapp.com' : 'http://localhost:1337',
    headers: {
        Accept: "application/json",
    },
};


let APIKit = axios.create(config);

APIKit.interceptors.request.use(async function (config) {
    try {
        console.log(config)
        console.log(config.baseURL)
        // let token = await getDataObject('@jwt');
        // if (token) config.headers.Authorization =`Bearer ${token.jwt}`;
    } catch (e) {
        console.log(e)
    }

    return config;
});

APIKit.interceptors.response.use(function (config) {
    console.log(config, 28)
    return config;
});

export default APIKit;