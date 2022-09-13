import ApiApp from "../../utils/ApiApp";
import { storeDataObject } from '../../utils/functions'
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialData = {
    user: null,
    isLogged: false,
    loading: false,
    jwt: null,
    userSiteConfig: {
        "id": 8,
        "app_id": "61f3140ace24e005a77924da",
        "khonnect_id": "20",
        "department_name": "Develop Department",
        "department_id": "200",
        "employment_name": "Develper",
        "employment_id": "2000", 
        "khor_name": "ORIGINAL TEST",
        "company_name": null,
        "company_id": null,
        "url_logo": null,
        "ynl_access": true,
        "place_name": "Merida Norte",
        "place_id": "22"
    }
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
            return { ...state }
        case LOGIN_EMAIL:
            return { ...state, loading: true, isLogged: false }
        case LOGIN_EMAIL_ERROR:
            return { ...state, loading: false, isLogged: false }
        case LOGIN_EMAIL_SUCCESS:
            return { ...state, loading: false, user: action.payload.user, jwt: action.payload.jwt, isLogged: true }
        case SUCCESS:
            return { ...state, ...action.payload }
        case LOGOUT:
            return { ...state, loading: false, isLogged: false }
        case ERROR:
            return { ...state, error: action.payload }
        case ERROR_SERVER:
            return { ...state, error: action.payload }
        default:
            return state
    }
}


export let createSession = (data) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_EMAIL_SUCCESS, payload: { user: data.user, jwt: data.jwt } });
        return true
    } catch (e) {
        console.log('authDuck createSession error => ', e.toString())
        return false
    }
}

export let emotionStatusAction = (userId) => async (dispatch) => {
    try {
        dispatch({ type: START });
        let response = await ApiApp.getEmotionStatus(userId);

        // console.log(response.data.data)
        dispatch({ type: SUCCESS, payload: { emotionStatus: response.data.data.length } });
    } catch (e) {
        console.log('authDuck emotionStatusAction error => ', e.toString())
        console.log(e.toString())
    }
}

export let loginEmail = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_EMAIL });
        // console.log('loginEmail=========', username, password)

        // console.log(username, password)
        let response = await ApiApp.loginWithEmail({
            identifier: username,
            password: password
        })


        // console.log(response, 60)
        await saveUserData(response.data.user, response.data.jwt)
        dispatch({ type: LOGIN_EMAIL_SUCCESS, payload: { user: response.data.user, jwt: response.data.jwt } });
        // console.log('login exitoso con email', response.data)
        return { status: 200, message: 'ok' }
    } catch (e) {
        dispatch({ type: LOGIN_EMAIL_ERROR });
        console.log('authDuck loginEmail error =>', e.toString())
        return { status: e.response.status, message: e.response.data.error.message }
    }
}

export let loginGoogle = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_EMAIL });
        // console.log('accessToken=========', accessToken)
        let response = await ApiApp.loginWithGoogle(accessToken)
        await saveUserData(response.data.user, response.data.jwt)
        dispatch({ type: LOGIN_EMAIL_SUCCESS, payload: { user: response.data.user, jwt: response.data.jwt } });
        // console.log('login exitoso con google', response.data.user)        
        return true;
    } catch (e) {
        console.log('authDuck loginGoogle error =>', e.toString())
        dispatch({ type: LOGIN_EMAIL_ERROR });
        return false
    }
}

export let loginApple = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_EMAIL });
        // console.log('accessToken=========', accessToken)
        let response = await ApiApp.loginWithApple(accessToken)
        await saveUserData(response.data.user, response.data.jwt)
        dispatch({ type: LOGIN_EMAIL_SUCCESS, payload: { user: response.data.user, jwt: response.data.jwt } });
        console.log('login exitoso con apple', response.data.user)
        return true;
    } catch (e) {
        console.log('authDuck loginApple error =>', e.toString())
        dispatch({ type: LOGIN_EMAIL_ERROR });
        return false
    }
}

export let loginLinkedIn = (accessToken) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_EMAIL });
        // console.log('accessToken=========', accessToken)
        let response = await ApiApp.loginWithLinked(accessToken)
        let responseData = await ApiApp.loginWithLinkedData(accessToken)
        let data = {
            jwt: response.data.jwt,
            user: {
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
        dispatch({ type: LOGIN_EMAIL_SUCCESS, payload: { user: data.user, jwt: data.jwt } });
        // console.log('login exitoso con LinkedIn', data.user)
        return true
    } catch (e) {
        console.log('authDuck loginLinkedIn error =>', e.toString())
        dispatch({ type: LOGIN_EMAIL_ERROR });
        return false
    }
}

const saveUserData = async (userData, jwt = null) => {
    try {
        await storeDataObject('@user', userData)
        if (jwt) {
            // console.log('jwt =>', jwt)
            await storeDataObject('@jwt', { jwt })
            console.log('jwt saved =>', jwt)
        }
    } catch (e) {
        console.log('authDuck saveUserData error =>', e.toString())
    }
}


export let logOutAction = () => async (dispatch) => {
    try {
        await AsyncStorage.removeItem('@user')
        await AsyncStorage.removeItem('@jwt')
        dispatch({ type: LOGOUT });
    } catch (e) {
        console.log('authDuck logOutAction error =>', e.toString())
        // error reading value
    }
}


export let registerAction = (data) => async (dispatch) => {
    try {
        dispatch({ type: START });
        let response = await ApiApp.register(data);
        dispatch({ type: SUCCESS });

    } catch (e) {
        console.log('authDuck registerAction error =>', e.toString())
        throw await ApiApp.resolveError(e.response);
    }
}


export let setAttribute = (key, value) => {
    return async (dispatch, getState) => {
        dispatch({ type: SUCCESS, payload: { [key]: value } })
    };
}


export default authDuck;