import axios from 'axios';
import { BASE_URL, FETCH_USERS, FETCH_USER, FETCH_ERROR} from './types';

export const fetchUser = (id) => async dispatch => {
    await axios.get(`${BASE_URL}/users/${id}/details`)
        .then(response => {
            dispatch({
                type: FETCH_USER, payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};

export const fetchUsers = (id) => async dispatch => {
    await axios.get(`${BASE_URL}/users`)
        .then(response => {
            
            dispatch({
                type: FETCH_USERS, payload: response.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_ERROR, payload: { error: err, status: err.status }
            })
        })
};