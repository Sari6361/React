
import axios from 'axios';
import * as actions from '../action';
import { useDispatch, useSelector } from 'react-redux';
const initialState = {
    shopping_list: [],
}
const Reducer_shopping = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_SHOPPING:
            {
                const shopping = state.shopping_list
                let index = shopping.findIndex(s => s.Id == action.pyload.Id)
                shopping[index] = action.pyload;
                return ({
                    ...state,
                    shopping_list: shopping
                })
            }
        case actions.GET_SHOPPING:
            {
                return ({ ...state });
            }
        case actions.ADD_SHOPPING:
            {
                let list = [...state.shopping_list];
                list.push(action.pyload);
                return ({
                    ...state,
                    shopping_list: list
                })

            }
        case actions.DELETE_SHOPPING:
            {
                let list = [...state.shopping_list];
                list = list.filter(l => l.Name !== action.pyload.Name);
                { console.log("reducer:", list) }
                return ({
                    ...state,
                    shopping_list: list
                })

            }
        default: return ({ ...state });
    }
}
export default Reducer_shopping;

