import { act } from 'react-dom/test-utils';
import * as actions from '../action';
const initialState = {
    recipies: [],
    selectRecipe: null,
    difficultyLevel:[]
    // [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }] 
    //  [{id: 1, name: "הכל"  }, { id: 2, name: "קל מאד" }, { id: 3, name: "קל" }, { id: 4, name: "בינוני" }, { id: 5, name: "קשה" }, { id: 6, name: "קשה מאד" }],
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
        default: return ({ ...state,difficultyLevel:[{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }]  });
    }

}
export default Reducer_recipe;