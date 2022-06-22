import ApiApp from "../../utils/ApiApp";
import {isEmailValid} from "../../utils/functions";
import _ from "lodash"

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
    try{
        dispatch({type: GET_MY_GROUPS});
        let response = await ApiApp.getMyGroups(userId)
        // console.log(response.data, 43)
        dispatch({type: GET_MY_GROUPS_SUCCESS, payload: response.data.data});
    } catch (e){
        console.log('groupDuck getMyGroups error => ',e.toString())
        dispatch({type: ERROR_FETCH});
        return false
    }
}

export let getUsersByUserName=(username='', userCurrent, membersExist)=> async(dispatch)=>{
    try {
        dispatch({type: GET_USERS});
        let response = await ApiApp.getUsersByUsername(username);
        let dataSucces = []
        if (response.data.length > 0){
            if (_.findIndex(response.data, { 'username': userCurrent.username }) !== -1){
                response.data.splice(_.findIndex(response.data, { 'username': userCurrent.username }),1)
            }
            if (membersExist.length > 0){
                for (let i=0;i<membersExist.length;i++){
                    if (_.findIndex(response.data, { 'email': membersExist[i].name }) !== -1){
                        response.data.splice(_.findIndex(response.data, { 'email': membersExist[i].name }),1)
                    }
                }
            }
            dataSucces = response.data
        }else{
            if (username !== userCurrent.username && username !== userCurrent.email){
                let valid = isEmailValid(username);
                if (valid){
                    let valid2=true
                    if (membersExist.length > 0){
                        for (let i=0;i<membersExist.length;i++){
                            if (membersExist[i].name === username){
                                valid2=false
                                break;
                            }
                        }
                    }
                    if (valid2){
                        dataSucces = [{
                            id: username,
                            email: username,
                            username: username
                        }]
                    }
                }
            }
        }
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: dataSucces
        });
    } catch (e){
        console.log('groupDuck getUsersByUserName error => ',e.toString())
        dispatch({type: ERROR_FETCH});
        return false
    }
}


export default groupDuck;