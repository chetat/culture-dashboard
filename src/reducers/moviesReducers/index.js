import {FETCH_MOVIES, FETCH_MOVIES_YEAR, FETCH_ERROR} from '../../actions/types';

export const initialState = {
    isLoading: false,
    fetchError: null,
    movies: {},
    movies_year: {}

};

const moviesReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_MOVIES:
            return {
                ...state, movies: action.payload
            };
        case FETCH_MOVIES_YEAR:
            return Object.assign({}, state, {
                    movies_year: action.payload
                });
        case FETCH_ERROR:
            return {
                ...state, fetchError: action.error
            }
        default:
            return state;
    }
}

export default moviesReducer;