import ApiApp from "../../utils/ApiApp";
import mime from 'react-native-mime-types'

const initialData = {
    loading:false,
    saving: false,
    books: [],
}

const LOADING = 'LOADING';
const SET_BOOKS = 'SET_BOOKS'
const SAVING = "SAVING"

const booksDuck = (state = initialData, action) => {
    switch (action.type) {
        case LOADING:
            return {...state, loading: action.payload}
        case SAVING: 
            return {...state, saving: action.payload}
        case SET_BOOKS:
            return {...state, books: action.payload}
        default:
            return state
    }
}

export const getBooks = (user_id) => async (dispatch) => {
    try {
        dispatch({type: LOADING, payload: true })
        let response = await ApiApp.getUserBooks(user_id)
        if(response?.status === 200){
            console.log(response?.data?.data[0].book)
            dispatch({type:SET_BOOKS, payload: response?.data?.data})
        }
        /* console.log(response?.data?.data) */
        dispatch({type: LOADING, payload: false });
        return true
    }catch (e) {
        dispatch({type: LOADING, payload: false });
        console.log('getBooks error =>', e.toString())
        return false
    }
}

export default booksDuck;