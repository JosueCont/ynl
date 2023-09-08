import ApiApp from "../../utils/ApiApp";
/* import {loadingOverlay} from './authDuck' */

const initialData = {
    categories: null,
    loading:false,
    dailyGoals: [],
    report: []
}

const START = 'START';
const FILLCATEGORIES = 'FILLCATEGORIES';
const DAILYGOALS = 'DAILYGOALS'
const LOADING = "LOADING"
const REPORT = "REPORT"

const goalsDuck = (state = initialData, action) => {
    switch (action.type) {
        case START:
            return {...state}
        case FILLCATEGORIES:
            return {...state, categories: action.payload}
        case DAILYGOALS:
            return {...state, dailyGoals: action.payload}
        case LOADING:
            return {...state, loading: action.payload}
        case REPORT:
            return {...state, report: action.payload}
        default:
            return state
    }
}

export let getGoalCategories = (data) => async (dispatch) => {
    try {
        let response = await ApiApp.getGoalCategories(data)
        if(response?.status === 200){
            dispatch({type: FILLCATEGORIES, payload: response?.data?.data });
        }
        return true
    }catch (e) {
        console.log('saveEmotion error =>', e.toString())
        return false
    }
}

export let getDateGoal = (date) => async (dispatch) => {
    dispatch({type: LOADING, payload: true });
    try {
        let response = await ApiApp.getDateGoal(date)
        if(response?.status === 200){
            dispatch({type: DAILYGOALS, payload: response?.data?.data });
        }
        dispatch({type: LOADING, payload: false });
        return true
    }catch (e) {
        dispatch({type: LOADING, payload: false });
        console.log('getDateGoal error =>', e.toString())
        return false
    }
}

export const saveDailyGoals = (data) => async (dispatch) => {
    try {
        let response = await ApiApp.saveDailyGoals(data)
        return response.data
    } catch (e) {
        console.log('saveEmotion error =>', e.toString())
        return false
    }
}

export const getGoalsReport = (data) => async (dispatch) => {
    try {
        dispatch({type: REPORT, payload: [] })
        let response = await ApiApp.getGoalsReport(data)
        if(response?.status === 200){
            dispatch({type: REPORT, payload: response.data })
        }
        /* dispatch({type: LOADING, payload: false }); */
        return true
    }catch (e) {
        /* dispatch({type: LOADING, payload: false }); */
        console.log('getReport error =>', e.toString())
        return false
    }
}



export default goalsDuck;