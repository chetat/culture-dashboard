import {FETCH_ALBUMS, FETCH_ERROR} from '../../actions/types';

export const initialState = {
    isLoading: false,
    fetchError: null,
    albums: {},

};

const albumsReducer = (state=initialState, action) => {
    switch(action.type){
        case FETCH_ALBUMS:
            return {
                ...state, albums: action.payload
            };
        case FETCH_ERROR:
            return {
                ...state, fetchError: action.error
            }
        default:
            return state;
    }
}

export default albumsReducer;