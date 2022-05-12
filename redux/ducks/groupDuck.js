import ApiApp from "../../utils/ApiApp";

const initialData = {
    users: null, // listado de usuarios que se buscan
    loading:false,
    fetchingUsers:false,
    listSelected:[], //usuarios elegidos para pertenecer al grupo que se está creando
    groups:[]
}

const START = 'START';
const ERROR_FETCH = 'ERROR_FETCH';
const GET_USERS = 'GET_USERS';
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
const GET_MY_GROUPS = 'GET_MY_GROUPS';
const GET_MY_GROUPS_SUCCESS = 'GET_MY_GROUPS_SUCCESS';


const groupDuck = (state = initialData, action) => {
    switch (action.type) {
        case START:
            return {...state}
        case GET_USERS:
            return {...state, fetchingUsers: true}
        case GET_USERS_SUCCESS:
            return {...state, fetchingUsers: false, users: action.payload}
        case GET_MY_GROUPS:
            return {...state, loading: true}
        case GET_MY_GROUPS_SUCCESS:
            return {...state, loading: false, groups: action.payload}
        case ERROR_FETCH:
            return {...state, fetchingUsers: false, loading:false}
        default:
            return state
    }
}


export let getMyGroups=(userId='')=> async(dispatch)=>{
    dispatch({type: GET_MY_GROUPS});
    try{
        let response = await ApiApp.getMyGroups(userId)
        console.log(response.data, 43)
        dispatch({type: GET_MY_GROUPS_SUCCESS, payload: response.data.data});
    }catch (e){
        dispatch({type: ERROR_FETCH});
        return false
    }
}

export let getUsersByUserName=(username='')=> async(dispatch)=>{
    dispatch({type: GET_USERS});
    try{
        let response = await ApiApp.getUsersByUsername(username)
        dispatch({type: GET_USERS_SUCCESS, payload:response.data});
    }catch (e){
        console.log('errorr====>', e)
        dispatch({type: ERROR_FETCH});
        return false
    }
}


export default groupDuck;