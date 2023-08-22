import ApiApp from "../../utils/ApiApp";

const initialData = {
    categories: null,
    loading:false,
    dailyGoals: []
}

const START = 'START';
const FILLCATEGORIES = 'FILLCATEGORIES';
const DAILYGOALS = 'DAILYGOALS'

const goalsDuck = (state = initialData, action) => {
    switch (action.type) {
        case START:
            return {...state}
        case FILLCATEGORIES:
            return {...state, categories: action.payload}
        case DAILYGOALS:
            return {...state, dailyGoals: action.payload}
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
    try {
        let response = await ApiApp.getDateGoal(date)
        if(response?.status === 200){
            dispatch({type: DAILYGOALS, payload: response?.data?.data });
        }
        return true
    }catch (e) {
        console.log('saveEmotion error =>', e.toString())
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

export default goalsDuck;