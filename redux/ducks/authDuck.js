import ApiApp from "../../utils/ApiApp";
import {storeDataObject} from '../../utils/functions'
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialData = {
    user: null,
    isLogged: false,
    loading: false,
    jwt: null
}

const START = 'START';
const SUCCESS = 'SUCCESS';
const LOGOUT = 'LOGOUT';

const ERROR = 'ERROR';
const ERROR_SERVER = 'ERROR_SERVER';
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const LOGIN_EMAIL_SUCCESS = 'LOGIN_EMAIL_SUCCESS';
const LOGIN_EMAIL_ERROR = 'LOGIN_EMAIL_ERROR';


const authDuck = (state = initialData, action) => {
    switch (action.type) {
        case START:
            return {...state}
        case LOGIN_EMAIL:
            return {...state, loading: true, isLogged: false}
        case LOGIN_EMAIL_ERROR:
            return {...state, loading: false, isLogged: false}
        case LOGIN_EMAIL_SUCCESS:
            return {...state, loading: false, user: action.payload.user, jwt: action.payload.jwt, isLogged: true}
        case SUCCESS:
            return {...state, ...action.payload}
        case LOGOUT:
            return {...state, loading: false, isLogged: false}
        case ERROR:
            return {...state, error: action.payload}
        case ERROR_SERVER:
            return {...state, error: action.payload}
        default:
            return state
    }
}


export let createSession = (data) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_EMAIL_SUCCESS, payload: {user: data.user, jwt: data.jwt}});
        return true
    } catch (e) {
        return false
    }
}

export let emotionStatusAction = (userId) => async (dispatch) => {
    try {
        dispatch({type: START});
        let response = await ApiApp.getEmotionStatus(userId);

        console.log(response.data.data)
        dispatch({type: SUCCESS, payload: {emotionStatus: response.data.data.length}});
    } catch (e) {
        console.log(e)
    }
}

export let loginEmail = (username, password) => async (dispatch) => {
    dispatch({type: LOGIN_EMAIL});
    console.log('loginEmail=========', username, password)
    try {

        console.log(username, password)
        let response = await ApiApp.loginWithEmail({
            identifier: username,
            password: password
        })


        console.log(response, 60)
        await saveUserData(response.data.user, response.data.jwt)
        dispatch({type: LOGIN_EMAIL_SUCCESS, payload: {user: response.data.user, jwt: response.data.jwt}});
        console.log('login exitoso con email', response.data)
        return {status:200, message:'ok'}
    } catch (e) {
        dispatch({type: LOGIN_EMAIL_ERROR});
        console.log('status code', e.response.status)
        return {status:e.response.status, message:e.response.data.error.message}
    }
}

export let loginGoogle = (accessToken) => async (dispatch) => {
    dispatch({type: LOGIN_EMAIL});
    console.log('accessToken=========', accessToken)
    try {
        let response = await ApiApp.loginWithGoogle(accessToken)
        await saveUserData(response.data.user, response.data.jwt)
        dispatch({type: LOGIN_EMAIL_SUCCESS, payload: {user: response.data.user, jwt: response.data.jwt}});
        console.log('login exitoso con google', response.data.user)        
        return true;
    } catch (e) {
        console.log('errorr====>', e)
        dispatch({type: LOGIN_EMAIL_ERROR});
        return false
    }
}

export let loginLinkedIn = (accessToken) => async (dispatch) => {
    dispatch({type: LOGIN_EMAIL});
    console.log('accessToken=========', accessToken)
    try {
        let response = await ApiApp.loginWithLinked(accessToken)
        let responseData = await ApiApp.loginWithLinkedData(accessToken)               
        let data = {
            jwt: response.data.jwt,
            user:{
                blocked: response.data.user.blocked,
                confirmed: response.data.user.confirmed,
                createdAt: response.data.user.createdAt,
                email: response.data.user.email,
                firstName: responseData.data.localizedFirstName,
                gender: response.data.user.gender,
                id: response.data.user.id,
                lastName: responseData.data.localizedLastName,
                phone: response.data.user.phone,
                provider: response.data.user.provider,
                shareMyData: response.data.user.shareMyData,
                updatedAt: response.data.user.updatedAt,
                username: response.data.user.username,
            }
        }
        await saveUserData(data.user, data.jwt)        
        dispatch({type: LOGIN_EMAIL_SUCCESS, payload: {user: data.user, jwt: data.jwt}});
        console.log('login exitoso con LinkedIn', data.user)
        return true
    } catch (e) {
        console.log('errorr====>', e)
        dispatch({type: LOGIN_EMAIL_ERROR});
        return false
    }
}

const saveUserData = async (userData, jwt = null) => {
    try {
        await storeDataObject('@user', userData)
        if (jwt) {
            console.log('jwt=====>', jwt)
            await storeDataObject('@jwt', {jwt})
            console.log('jwt saved =====>', jwt)
        }

    } catch (e) {

    }
}


export let logOutAction = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('@user')
        await AsyncStorage.removeItem('@jwt')
        dispatch({type: LOGOUT});
    } catch (ex) {
        console.log(ex)
        // error reading value
    }
}


export let registerAction = (data) => async (dispatch) => {
    dispatch({type: START});
    try {
        let response = await ApiApp.register(data);
        dispatch({type: SUCCESS});

    } catch (e) {
        console.log(e.response, 140)
        throw await ApiApp.resolveError(e.response);
    }
}


export let setAttribute = (key, value) => {
    return async (dispatch, getState) => {
        dispatch({type: SUCCESS, payload: {[key]: value}})
    };
}


export default authDuck;