import ApiApp from "../../utils/ApiApp";
import {storeDataObject, getDataObject, storeData} from '../../utils/functions'
const initialData = {
    user: null,
    isLogged:false,
    loading:false,
    jwt:null
}

const START = 'START';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ERROR_SERVER = 'ERROR_SERVER';
const LOGIN_EMAIL = 'LOGIN_EMAIL';
const LOGIN_EMAIL_SUCCESS = 'LOGIN_EMAIL_SUCCESS';
const LOGIN_EMAIL_ERROR = 'LOGIN_EMAIL_ERROR';


const productsDuck = (state = initialData, action) => {
    switch (action.type) {
        case START:
            return {...state}
        case LOGIN_EMAIL:
            return {...state, loading: true, isLogged: false}
        case LOGIN_EMAIL_ERROR:
            return {...state, loading: false, isLogged: false}
        case LOGIN_EMAIL_SUCCESS:
            return {...state, loading: false, user: action.payload.user, jwt:action.payload.jwt ,isLogged:true}
        case SUCCESS:
            return {...state, insurances: action.payload}
        case ERROR:
            return {...state, error: action.payload}
        case ERROR_SERVER:
            return {...state, error: action.payload}
        default:
            return state
    }
}


export let createSession = (data) => async (dispatch)=>{
    console.log('from duck redux', data)
    try{
        dispatch({type: LOGIN_EMAIL_SUCCESS, payload: {user:data.user, jwt: data.jwt}});
        return true
    }catch (e){
        return false
    }
}

export let loginEmail=(username, password)=> async(dispatch)=>{
    dispatch({type: LOGIN_EMAIL});
    console.log('loginEmail=========',username,password)
    try{
        let response = await ApiApp.loginWithEmail({
            identifier:username,
            password: password
        })
        await saveUserData(response.data.user, response.data.jwt)
        dispatch({type: LOGIN_EMAIL_SUCCESS, payload: {user:response.data.user, jwt: response.data.jwt}});
        console.log('login exitoso con email',response.data)
        return true
    }catch (e){
        console.log('errorr====>', e)
        dispatch({type: LOGIN_EMAIL_ERROR});
        return false
    }
}


const saveUserData=async (userData,jwt=null)=>{
    try {
        await storeDataObject('@user',userData)
        if(jwt){
            console.log('jwt=====>', jwt)
            await storeDataObject('@jwt', {jwt})
            console.log('jwt saved =====>', jwt)
        }

    }catch (e){

    }
}

export default productsDuck;