
import * as actions from '../action';

const initialState = {
    shopping_list: [],
}

const Reducer_shopping = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_SHOPPING:
            {
                const shopping = state.shopping_list
                let index = shopping.findIndex(s => s.Id === action.pyload.Id)
                shopping[index].Count = action.pyload.Count;
                return ({
                    ...state,
                    shopping_list: shopping
                })
            }
        case actions.GET_SHOPPING:
            {
                return ({
                    ...state,
                    shopping_list: action.pyload
                });
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
                list = list.filter(l => l.Id != action.pyload);
                return ({
                    ...state,
                    shopping_list: list
                })

            }
        default: return ({ ...state });
    }
}
export default Reducer_shopping;

