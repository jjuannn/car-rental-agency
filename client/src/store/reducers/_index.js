import {combineReducers} from 'redux';
import carsReducer from './cars';
import clientsReducer from './clients';
import rentalsReducer from './rentals';

const reducers = combineReducers({
  cars: carsReducer,
  clients: clientsReducer,
  rentals: rentalsReducer
});

export default reducers;
