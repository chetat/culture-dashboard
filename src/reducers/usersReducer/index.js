
import {FETCH_USERS, FETCH_USER_TYPE} from '../../actions/types';

export const initialState = {
    users_data: {},
    types: {}
};

const usersReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_USERS:
            return Object.assign({}, state, {
                users_data: action.payload.data
            })
        case FETCH_USER_TYPE:
            return Object.assign({}, state, {
                types: action.payload.data
            })
        default:
            return state;
    }
}

export default usersReducer;