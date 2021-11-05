import {
  getRentals as getRentalsService,
  addRental as addRentalService,
  deleteRental as deleteRentalService,
  editRental as editRentalService
} from '../services/rental';
import {
  RENTAL_FETCHING_FAILURE,
  RENTAL_FETCHING_LOADING,
  RENTAL_FETCHING_SUCCESS,
  ADDING_RENTAL_FAILURE,
  ADDING_RENTAL_LOADING,
  ADDING_RENTAL_RESET,
  ADDING_RENTAL_SUCCESS,
  DETAIL_RENTAL_FAILURE,
  DETAIL_RENTAL_LOADING,
  DETAIL_RENTAL_SUCCESS,
  DELETE_RENTAL_FAILURE,
  DELETE_RENTAL_LOADING,
  DELETE_RENTAL_SUCCESS,
  DELETE_RENTAL_RESET,
  EDIT_RENTAL_FAILURE,
  EDIT_RENTAL_LOADING,
  EDIT_RENTAL_RESET,
  EDIT_RENTAL_SUCCESS
} from '../store/actions/rentals';
import {useDispatch, useSelector} from 'react-redux';

export default function useRentals() {
  const dispatch = useDispatch();
  const {rentalList, rentalAdd, rentalDetail, rentalDelete, rentalEdit} = useSelector(
    state => state.rentals
  );

  const getRentals = async () => {
    dispatch(EDIT_RENTAL_RESET());
    dispatch(DELETE_RENTAL_RESET());
    dispatch(ADDING_RENTAL_RESET());
    dispatch(RENTAL_FETCHING_LOADING());
    try {
      const apiData = await getRentalsService();
      dispatch(RENTAL_FETCHING_SUCCESS(apiData));
    } catch (err) {
      dispatch(RENTAL_FETCHING_FAILURE(err));
    }
  };

  const addRental = async data => {
    dispatch(ADDING_RENTAL_LOADING());
    try {
      await addRentalService(data);
      dispatch(ADDING_RENTAL_SUCCESS());
    } catch (err) {
      dispatch(ADDING_RENTAL_FAILURE(err));
    }
  };

  const getRental = async id => {
    dispatch(DETAIL_RENTAL_LOADING());
    try {
      const rental = rentalList.data.find(rental => Number(rental.id) === Number(id));
      dispatch(DETAIL_RENTAL_SUCCESS(rental));
    } catch (err) {
      dispatch(DETAIL_RENTAL_FAILURE(err));
    }
  };

  const deleteRental = async id => {
    dispatch(DELETE_RENTAL_LOADING());
    try {
      const rental = rentalList.data.find(rental => Number(rental.id) === Number(id));
      if (rental.is_paid !== true) {
        throw new Error("The rental isn't paid yet!");
      }
      await deleteRentalService(id);
      dispatch(DELETE_RENTAL_SUCCESS());
    } catch (err) {
      dispatch(DELETE_RENTAL_FAILURE(err));
    }
  };

  const editRental = async (id, data) => {
    dispatch(EDIT_RENTAL_LOADING());
    try {
      await editRentalService(id, data);
      dispatch(EDIT_RENTAL_SUCCESS());
    } catch (err) {
      dispatch(EDIT_RENTAL_FAILURE(err));
    }
  };

  return {
    data: rentalList.data,
    loading: rentalList.loading,
    error: rentalList.error,
    rentalAddSending: rentalAdd.sending,
    rentalAddSuccess: rentalAdd.success,
    rentalAddError: rentalAdd.error,
    rentalDetailData: rentalDetail.data,
    rentalDetailError: rentalDetail.error,
    rentalDetailLoading: rentalDetail.loading,
    rentalDeleteLoading: rentalDelete.loading,
    rentalDeleteSuccess: rentalDelete.success,
    rentalDeleteError: rentalDelete.error,
    rentalEditError: rentalEdit.error,
    rentalEditSuccess: rentalEdit.success,
    rentalEditLoading: rentalEdit.sending,
    getRentals,
    addRental,
    getRental,
    deleteRental,
    editRental
  };
}
