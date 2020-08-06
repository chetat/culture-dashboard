import {
    FETCH_MOVIES, FETCH_MOVIES_YEAR,
    FETCH_ERROR, FETCH_MOVIE_GENRES,
    FETCH_MOVIE_TYPES, FETCH_MOVIE
} from '../../actions/types';

export const initialState = {
    isLoading: false,
    fetchError: null,
    movies: {},
    genres: {},
    types: {},
    movie: {},
    movies_year: {}

};

const moviesReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_MOVIES:
            return {
                ...state, movies: action.payload
            };
        case FETCH_MOVIE:
                return Object.assign({}, state, {
                    movie: action.payload
                })
        case FETCH_MOVIES_YEAR:
            return Object.assign({}, state, {
                    movies_year: action.payload
                });
        case FETCH_MOVIE_GENRES:
            return Object.assign({}, state, {
                genres: action.payload
            })
        case FETCH_MOVIE_TYPES:
                return Object.assign({}, state, {
                    types: action.payload
                })
        case FETCH_ERROR:
            return {
                ...state, fetchError: action.error
            }
        default:
            return state;
    }
}

export default moviesReducer;