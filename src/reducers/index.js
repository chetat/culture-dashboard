import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import moviesReducer from './moviesReducers';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import albumsReducer from './albumsReducer';
import albumReducer from './albumReducer';




const combineReducer = (history) => combineReducers({
  router: connectRouter(history),
  movies: moviesReducer,
  user: userReducer,
  users: usersReducer,
  albums: albumsReducer,
  album: albumReducer
});

export default combineReducer;