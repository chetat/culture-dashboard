
import {FETCH_USERS} from '../../actions/types';

export const initialState = {
    users_data: {},
};

const usersReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_USERS:
            return Object.assign({}, state, {
                users_data: action.payload.data
            })
        default:
            return state;
    }
}

export default usersReducer;