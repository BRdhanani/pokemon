import {createStore, combineReducers, applyMiddleware} from 'redux';
import home from './reducers/home';
import loader from './reducers/loader';
import detail from './reducers/detail';
import thunk from 'redux-thunk';

const middlewares = [thunk];

const rootReducer = combineReducers({
  home,
  loader,
  detail,
});

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
