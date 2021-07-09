import {
  getCars as getCarsService,
  addCar as addCarService,
  deleteCar as deleteCarService,
  getCar as getCarService,
  editCar as editCarService
} from '../services/car';
import {useSelector, useDispatch} from 'react-redux';
import {
  FETCHING_FAILURE,
  FETCHING_LOADING,
  FETCHING_SUCCESS,
  ADDING_CAR_FAILURE,
  ADDING_CAR_RESET,
  ADDING_CAR_LOADING,
  ADDING_CAR_SUCCESS,
  DELETING_CAR_FAILURE,
  DELETING_CAR_LOADING,
  DELETING_CAR_SUCCESS,
  DETAIL_CAR_ERROR,
  DETAIL_CAR_LOADING,
  DETAIL_CAR_SUCCESS,
  EDIT_CAR_FAILURE,
  EDIT_CAR_LOADING,
  EDIT_CAR_SUCCESS,
  EDIT_CAR_RESET
} from '../store/actions/cars';

export default function useCars() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.cars);
  const {carList, carAdded, carDeleted, carDetail, carEdit} = state;

  const getCars = async () => {
    dispatch(ADDING_CAR_RESET());
    dispatch(EDIT_CAR_RESET());
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

  const deleteCar = async id => {
    dispatch(DELETING_CAR_LOADING());
    try {
      await deleteCarService(id);
      dispatch(DELETING_CAR_SUCCESS());
    } catch (err) {
      dispatch(DELETING_CAR_FAILURE(err));
    }
  };

  const getCar = async id => {
    dispatch(DETAIL_CAR_LOADING());
    try {
      const apiData = await getCarService(id);
      dispatch(DETAIL_CAR_SUCCESS(apiData));
    } catch (err) {
      dispatch(DETAIL_CAR_ERROR(err));
    }
  };

  const editCar = async (id, data) => {
    dispatch(EDIT_CAR_LOADING());
    try {
      await editCarService(id, data);
      dispatch(EDIT_CAR_SUCCESS());
    } catch (err) {
      dispatch(EDIT_CAR_FAILURE(err));
    }
  };

  return {
    data: carList.data,
    loading: carList.loading,
    error: carList.error,
    carDetailData: carDetail.data,
    carDetailLoading: carDetail.loading,
    carDetailError: carDetail.error,
    deleteCarLoading: carDeleted.loading,
    deleteCarSuccess: carDeleted.success,
    deleteCarError: carDeleted.error,
    addCarLoading: carAdded.loading,
    addCarError: carAdded.error,
    addCarSuccess: carAdded.success,
    carEditLoading: carEdit.loading,
    carEditSuccess: carEdit.success,
    carEditError: carEdit.error,
    getCars,
    addCar,
    deleteCar,
    getCar,
    editCar
  };
}
