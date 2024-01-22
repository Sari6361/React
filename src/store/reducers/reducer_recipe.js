import { act } from 'react-dom/test-utils';
import * as actions from '../action';
const initialState = {
    recipies: [],
    selectRecipe: null,
    difficultyLevel:[]
}

const Reducer_recipe = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_RECIPE:
            {
                let recipiesl = [...state.recipies];
                recipiesl.push(action.pylaod);
                return ({
                    ...state,
                    recipies:recipiesl
                })
            }
        case actions.EDIT_RECIPE:
            {
                let recipiesl = [...state.recipies];
                const index = recipiesl.findIndex(r => r.Id === action.pyload.Id);
                recipiesl[index] = action.pyload;
                return ({
                    ...state,
                    recipies:recipiesl
                })
            }
        case actions.DELETE_RECIPE:
            {
                let recipiesl = [...state.recipies];
                recipiesl = recipiesl.filter(r => r.Id != action.pyload);
                return ({
                    ...state,
                    recipies:recipiesl
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
        default: return ({ ...state,difficultyLevel:[{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }]  });
    }

}
export default Reducer_recipe;