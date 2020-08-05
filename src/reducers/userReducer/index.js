
import { FETCH_USER } from '../../actions/types';

export const initialState = {
    user_data: {},
};

const userReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_USER:
            return Object.assign({}, state, {
                user_data: action.payload
            })
        default:
            return state;
    }
}

export default userReducer;