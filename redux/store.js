import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import productsDuck from "./ducks/productsDuck";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
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
    const auth = getAuth();
    onAuthStateChanged(auth,(user)=>{
        createSession(user);
    })
    //savedSession()(store.dispatch)
    return store
}