import axios from 'axios';
import { BASE_URL, FETCH_ERROR, FETCH_ALBUMS, FETCH_ALBUM} from './types';

export const fetchAlbums = () => async dispatch => {
    await axios.get(`${BASE_URL}/albums`)
        .then(response => {
            dispatch({
                type: FETCH_ALBUMS, payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};

export const fetchAlbum = (id) => async dispatch => {
    await axios.get(`${BASE_URL}/albums/${id}`)
        .then(response => {
            dispatch({
                type: FETCH_ALBUM, payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};

/*export const filterMovie = (startDate, endDate) => async dispatch => {
    await axios.get(`${BASE_URL}/movies/search?startDate=${startDate}&endDate=${endDate}`)
        .then(response => {
            console.log("Search Called")
            dispatch({
                type: FETCH_SEARCHED_RESULTS, payload: response.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};*/