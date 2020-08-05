
import { FETCH_ALBUM } from '../../actions/types';

export const initialState = {
    album_data: {},
};

const movieReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_ALBUM:
            return Object.assign({}, state, {
                album_data: action.payload
            })
        default:
            return state;
    }
}

export default movieReducer;