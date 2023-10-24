import ApiApp from "../../utils/ApiApp";
import mime from 'react-native-mime-types'

const initialData = {
    loading:false,
    saving: false,
    books: [],
    searchActive: false,
}

const LOADING = 'LOADING';
const SET_BOOKS = 'SET_BOOKS'
const SAVING = "SAVING"
const SEARCH_ACTIVE = "SEARCH_ACTIVE"

const booksDuck = (state = initialData, action) => {
    switch (action.type) {
        case LOADING:
            return {...state, loading: action.payload}
        case SAVING: 
            return {...state, saving: action.payload}
        case SET_BOOKS:
            return {...state, books: action.payload}
        case SEARCH_ACTIVE: 
            return {...state, searchActive: action.payload}
        default:
            return state
    }
}

export const getBooks = (user_id) => async (dispatch) => {
    try {
        dispatch({type: LOADING, payload: true })
        let response = await ApiApp.getUserBooks(user_id)
        if(response?.status === 200){
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

export const getPagesBook = (book_code) => async (dispatch) => {
    try {
        dispatch({type: LOADING, payload: true })
        let response = await ApiApp.getPagesBook(book_code)
        if(response?.status === 200){
            dispatch({type: LOADING, payload: false });
            return response?.data?.data
        }
        /* console.log(response?.data?.data) */
    
    }catch (e) {
        dispatch({type: LOADING, payload: false });
        console.log('getOneBook error =>', e.toString())
        return false
    }
}

export const getMarkers = (user_id, book_code) => async (dispatch) => {
    try {
        let response = await ApiApp.getMarkers(user_id, book_code)
        if(response?.status === 200){
            return response?.data?.data
        }else{
            return false
        }
    } catch (error) {
        console.log('get Markers error =>', e.toString())
        return false
    }
}

export const addMarker = (data) => async (dispatch) => {
    try {
        let response = await ApiApp.addMarker(data)
        console.log('===>', response.data)
        return true
    } catch (error) {
        console.log('add marker error =>', e.toString())
        return false
    }
}

export const updLastPageRead = (data) => async (dispatch) => {
    try {
        let response = await ApiApp.updLastPageRead(data)
        console.log('=================>', response.data)
        return true
    } catch (e) {
        console.log('upd last page error =>', e.toString())
        return false
    }
}

export default booksDuck;