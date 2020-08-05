import axios from 'axios';
import { BASE_URL, FETCH_MOVIES, FETCH_ERROR, FETCH_MOVIE,FETCH_MOVIES_YEAR, FETCH_SEARCHED_RESULTS } from './types';

export const fetchMovies = () => async dispatch => {
    await axios.get(`${BASE_URL}/movies`)
        .then(response => {
            dispatch({
                type: FETCH_MOVIES, payload: response.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};

export const fetchMovie = (id) => async dispatch => {
    await axios.get(`${BASE_URL}/movies/${id}`)
        .then(response => {
            dispatch({
                type: FETCH_MOVIE, payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};

export const getMovieByYear = (year) => async dispatch => {
    await axios.get(`${BASE_URL}/movies/years/${year}`)
        .then(response => {
            dispatch({
                type: FETCH_MOVIES_YEAR, payload: response.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};


export const filterMovie = (startDate, endDate) => async dispatch => {
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
};