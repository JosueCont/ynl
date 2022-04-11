const initialData = {
    insurances: null
}

const START = 'START';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';
const ERROR_SERVER = 'ERROR_SERVER';

const productsDuck = (state = initialData, action) => {
    switch (action.type) {
        case START:
            return {...state}
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

export let getProducts = () => {
    return async (dispatch, getState) => {
        dispatch({type: INSURANCE});
        try {
            const response = await getInsuranceCompanies();
            dispatch({type: INSURANCE_SUCCESS, payload: response.data.data.aseguradoras})
            return true
        } catch (err) {
            dispatch({type: INSURANCE_ERROR_SERVER, payload: err.response})
            return false
        }
    };
}


export default productsDuck;