import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import productsDuck from "./ducks/productsDuck";
import {getDataObject} from '../utils/functions'
import authDuck, {createSession, emotionStatusAction} from "./ducks/authDuck";
import feelingsDuck from "./ducks/feelingsDuck";
import groupDuck from "./ducks/groupDuck";


const rootReducer = combineReducers({
    productsDuck: productsDuck,
    authDuck: authDuck,
    feelingsDuck:  feelingsDuck,
    groupDuck: groupDuck
})

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default () => {
    (async () => {
        try {
            const user = await getDataObject('@user')
            const jwt = await getDataObject('@jwt')
            const site = await getDataObject('@site')
            if (user) {
                createSession({user, jwt, site})(store.dispatch)
                emotionStatusAction(user.id)(store.dispatch)
            }
        } catch (e) {
            console.log('store error => ',e.toString())
        }
    })()
    return store
}

