import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';



const history = createBrowserHistory();
export const getHistory = () => history

const persistConfig = {
  key: 'root',
  storage,
}


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export const store = createStore(
  persistedReducer,
  composeEnhancer( applyMiddleware(
    routerMiddleware(history),
    thunk
  )));

export const persistor = persistStore(store)