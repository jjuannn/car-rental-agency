import {combineReducers} from 'redux';
import carsReducer from './cars';
import clientsReducer from './clients';

const reducers = combineReducers({
  cars: carsReducer,
  clients: clientsReducer
});

export default reducers;
