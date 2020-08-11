import axios from 'axios';
import { 
    BASE_URL, FETCH_MOVIES,
    MOVIE_LOADING,
    FETCH_ERROR, FETCH_MOVIE,
    FETCH_MOVIES_YEAR, 
    FETCH_SEARCHED_RESULTS, 
    FETCH_MOVIE_GENRES, FETCH_MOVIE_TYPES
} from './types';


export const addMovie = (movie, image) => async dispatch => {
    movie["category_id"] = 2
    await axios.put(`${BASE_URL}/images/upload`, image,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        movie["cover_url"] = response.data["cover_url"]
        return axios.post(`${BASE_URL}/movies`, movie)
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
      })
      .catch(err => {
        dispatch({
            type: FETCH_ERROR, payload: { error: err, status: err.status }
        })
      })
};

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

export const fetchMoviesGenres = () => async dispatch => {
    const MOVIE_CATEGORY_ID = 2;
    await axios.get(`${BASE_URL}/categories/${MOVIE_CATEGORY_ID}/genres`)
        .then(response => {
            dispatch({
                type: FETCH_MOVIE_GENRES, payload: response.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};


export const fetchMoviesTypes = () => async dispatch => {
    await axios.get(`${BASE_URL}/movies/types`)
        .then(response => {
            dispatch({
                type: FETCH_MOVIE_TYPES, payload: response.data.data
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