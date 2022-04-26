import ApiApp from "../../utils/ApiApp";
import {storeDataObject, getDataObject, storeData} from '../../utils/functions'
const initialData = {
    feelings: null,
    loading:false
}

const START = 'START';
const GET_FEELINGS = 'GET_FEELINGS';
const GET_FEELINGS_SUCCESS = 'GET_FEELINGS_SUCCESS';
const FEELINGS_SAVE = 'FEELINGS_SAVE';
const FEELINGS_SAVE_SUCCESS = 'FEELINGS_SAVE_SUCCESS';


const feelingsDuck = (state = initialData, action) => {
    switch (action.type) {
        case START:
            return {...state}
        case GET_FEELINGS:
            return {...state, loading: true}
        case GET_FEELINGS_SUCCESS:
            return {...state, loading: false, feelings: action.payload}
        default:
            return state
    }
}


export let getEmotions=(query='')=> async(dispatch)=>{
    dispatch({type: GET_FEELINGS});

    try{
        let response = await ApiApp.getFeelings(query)
        dispatch({type: GET_FEELINGS_SUCCESS, payload:response.data.data});
        return response.data
    }catch (e){
        console.log('errorr====>', e)
        return false
    }
}

export let saveEmotion=(data)=>async(dispatch)=>{
    dispatch({type:FEELINGS_SAVE})
    try{
        let response = await ApiApp.saveFeeling(data)
        return true
    }catch (e){
        console.log('errorr====>', e)
        return false
    }
}

export default feelingsDuck;