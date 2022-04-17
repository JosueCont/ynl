import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import productsDuck from "./ducks/productsDuck";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getData, getDataObject} from '../utils/functions'
import authDuck, {createSession} from "./ducks/authDuck";
const rootReducer = combineReducers({
    productsDuck: productsDuck,
    authDuck:authDuck
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default () => {

    (async ()=>{
        try {
            const user = await getDataObject('@user')
            const jwt = await getDataObject('@jwt')
            console.log('user======>', {user,jwt:jwt.jwt})
            if(user){
                createSession({user, jwt})(store.dispatch)
            }
        }catch (e){}
    })()
    return store
}