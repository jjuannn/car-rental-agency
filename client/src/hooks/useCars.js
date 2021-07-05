import {getCars as getCarsService, addCar as addCarService} from '../services/car';
import {useSelector, useDispatch} from 'react-redux';
import {
  FETCHING_FAILURE,
  FETCHING_LOADING,
  FETCHING_SUCCESS,
  ADDING_CAR_FAILURE,
  ADDING_CAR_RESET,
  ADDING_CAR_LOADING,
  ADDING_CAR_SUCCESS
} from '../store/actions/cars';

export default function useCars() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.cars);
  const {carList, carAdded} = state;

  const getCars = async () => {
    dispatch(ADDING_CAR_RESET());
    dispatch(FETCHING_LOADING());
    try {
      const apiData = await getCarsService();
      dispatch(FETCHING_SUCCESS(apiData));
    } catch (err) {
      dispatch(FETCHING_FAILURE(err));
    }
  };

  const addCar = async data => {
    dispatch(ADDING_CAR_LOADING());
    try {
      const addedCar = await addCarService(data);
      dispatch(FETCHING_SUCCESS([...carList.data, addedCar]));
      dispatch(ADDING_CAR_SUCCESS());
    } catch (err) {
      dispatch(ADDING_CAR_FAILURE(err));
    }
  };

  return {
    data: carList.data,
    loading: carList.loading,
    error: carList.error,
    addCarLoading: carAdded.loading,
    addCarError: carAdded.error,
    addCarSuccess: carAdded.success,
    getCars,
    addCar
  };
}
