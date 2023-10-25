
const initialData = {
    modules:[],
    progress:[],
    phrase:''
}

const SET_MODULE_LIST = 'set_module_list';
const SET_PROGRESS_INFO = 'set_progress_info';
const SET_PHRASE_DAY = 'set_phrase_day';
const DELETE_MODULES_USER = 'delete_modules_user';


const modulesDuck = (state = initialData, action) => {
    switch(action.type){
        case SET_MODULE_LIST:
            return {...state, modules: action.payload }
        case SET_PROGRESS_INFO:
            return {...state, progress: action.payload}
        case SET_PHRASE_DAY:
            return { ...state, phrase: action.payload}
        case DELETE_MODULES_USER:
            return {...state, modules:[], progress:[]}
        default:
            return state
    }
}


export const saveInfoModules = (data) => (dispatch) => {
    console.log('data del redux',data.data)
    
    dispatch({type:SET_MODULE_LIST, payload:data.data.modules})
    dispatch({type:SET_PROGRESS_INFO, payload: data.data.progressPercentage})
    
}

export const savePhraseDay = (data) => {
    return{
        type: SET_PHRASE_DAY,
        payload: data
    }
}

export const removeModulesLogout = () => {
    return{
        type:DELETE_MODULES_USER,
    }
}
export default modulesDuck;