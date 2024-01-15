import {createStore, applyMiddleware, combineReducers} from 'redux';
import Reducer_user from './reducers/reducer_user'
import Reducer_category from './reducers/reducer_category'
import Reducer_recipe from './reducers/reducer_recipe'
import Reducer_shopping from './reducers/reducer_shopping'
import { thunk } from 'redux-thunk'

const reducers=combineReducers({
    user:Reducer_user,
    recipe:Reducer_recipe,
    category:Reducer_category,
    shopping:Reducer_shopping
})

const store =createStore(reducers, applyMiddleware(thunk));

export default store;