import { act } from 'react-dom/test-utils';
import * as actions from '../action';
const initialState = {
    recipies: [],
    selectRecipe: null,
    difficultyLevel: ["הכל","קל מאד","קל","בינוני","קשה","קשה מאד"],
}

const Reducer_recipe = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_RECIPE:
            {
                let recipies = [...state.recipies];
                recipies.push(action.pylaod);
                return ({
                    ...state,
                    recipies
                })
            }
        case actions.EDIT_RECIPE:
            {
                let recipies = [...state.recipies];
                const index = recipies.findIndex(r => r.Id = action.pylaod.Id);
                recipies[index] = action.pylaod;
                return ({
                    ...state,
                    recipies
                })
            }
        case actions.DELETE_RECIPE:
            {
                let recipies = [...state.recipies];
                recipies = recipies.filter(r => r.Id !== action.pyload.Id);
                return ({
                    ...state,
                    recipies
                })
            }
        case actions.SET_RECIPE:
            {
                return ({
                    ...state,
                    recipies: action.pyload
                })
            }
            case actions.SET_SELECTED_RECIPE:
                {
                    return ({
                        ...state,
                        selectRecipe: action.pyload
                    })
                }
        default: return ({ ...state });
    }

}
export default Reducer_recipe;