import {combineReducers} from 'redux';
import carsReducer from './cars';

const reducers = combineReducers({
  cars: carsReducer
});

export default reducers;
