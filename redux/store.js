import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import productsDuck from "./ducks/productsDuck";
import {getDataObject} from '../utils/functions'
import authDuck, {createSession} from "./ducks/authDuck";
import feelingsDuck from "./ducks/feelingsDuck";
import groupDuck from "./ducks/groupDuck";


const rootReducer = combineReducers({
    productsDuck: productsDuck,
    authDuck:authDuck,
    feelingsDuck:  feelingsDuck,
    groupDuck:groupDuck
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
            if (user) {
                createSession({user, jwt})(store.dispatch)
            }
        } catch (ex) {
            console.log(ex)
        }
    })()
    return store
}

