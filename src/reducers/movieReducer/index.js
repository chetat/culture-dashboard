
import { FETCH_MOVIE } from '../../actions/types';

export const initialState = {
    movie_data: {},
};

const movieReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_MOVIE:
            return Object.assign({}, state, {
                movie_data: action.payload
            })
        default:
            return state;
    }
}

export default movieReducer;