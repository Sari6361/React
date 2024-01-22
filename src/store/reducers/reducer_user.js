import * as actions from '../action';
const initialState = {
    user: null,
}

const Reducer_user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            {
                return ({
                    ...state,
                    user: action.pylaod 
                })
            }
        default: return ({ ...state });

    }
}
export default Reducer_user;