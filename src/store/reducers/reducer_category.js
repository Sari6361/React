import * as actionsName from '../action';
const initialState = {
    categories: [],
}

const Reducer_category = (state = initialState, action) => {
    switch (action.type) {
        case actionsName.ADD_CATEGORY:
            {
                let categories = [...state.categories]
                categories.push(action.pyload);
                return ({
                    ...state,
                    categories
                })
            }
        case actionsName.SET_CATEGORY:
            {
                return ({
                     ...state,
                    categories:action.pyload });
            }
        default: return ({ ...state });
    }


}
export default Reducer_category;