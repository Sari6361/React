
import { useDispatch } from 'react-redux';
import * as actions from '../action';
import axios from 'axios';
const initialState = {
    user: null,
}

const Reducer_user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            {
                console.log("set_user");
                {console.log(action.pylaod)}
                return ({
                    ...state,
                    user: action.pylaod 
                })
            }
        default: return ({ ...state });

    }
}
export default Reducer_user;