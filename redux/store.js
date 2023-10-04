import {applyMiddleware, combineReducers, createStore} from "redux"
import thunk from "redux-thunk"
import productsDuck from "./ducks/productsDuck";
import {getDataObject} from '../utils/functions'
import authDuck, {createSession, emotionStatusAction} from "./ducks/authDuck";
import feelingsDuck from "./ducks/feelingsDuck";
import groupDuck from "./ducks/groupDuck";
import goalsDuck from './ducks/goalsDuck'
import projectsDuck from './ducks/projectsDuck'
import booksDuck from './ducks/booksDuck'


const rootReducer = combineReducers({
    productsDuck: productsDuck,
    authDuck: authDuck,
    feelingsDuck:  feelingsDuck,
    groupDuck: groupDuck,
    goalsDuck: goalsDuck,
    projectsDuck: projectsDuck,
    booksDuck: booksDuck
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
                //console.log("🚀 ~ file: store.js ~ line 31 ~ site", site)
                if(site){ 
                    emotionStatusAction(user.id, site.id)(store.dispatch)
                }
                else{
                    emotionStatusAction(user.id)(store.dispatch)
                }

                
            }
        } catch (e) {
            console.log('store error => ',e.toString())
        }
    })()
    return store
}

