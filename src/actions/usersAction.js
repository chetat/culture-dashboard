import axios from 'axios';
import { BASE_URL, FETCH_USERS,FETCH_USER_TYPE, FETCH_USER, FETCH_ERROR} from './types';


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

export const fetchUserType = () => async dispatch => {
    await axios.get(`${BASE_URL}/user-types`)
    .then(response => {
        dispatch({
            type: FETCH_USER_TYPE, payload: response.data
        })
    })
    .catch(err => {
        dispatch({
            type: FETCH_ERROR, payload: {error: err, status: err.status}
        })
    })
}

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


export const addUser = (user, image) => async dispatch => {
    await axios.put(`${BASE_URL}/images/upload`, image,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        user["photo"] = response.data["cover_url"]
        return axios.post(`${BASE_URL}/users`, user)
            .then(response => {
                dispatch({
                    type: FETCH_USERS, payload: response.data.data
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
