import {
  getClients as getClientsService,
  deleteClient as deleteClientService,
  addClient as addClientService,
  editClient as editClientService
} from '../services/client';
import {useDispatch, useSelector} from 'react-redux';
import {
  CLIENTS_FETCHING_FAILURE,
  CLIENTS_FETCHING_LOADING,
  CLIENTS_FETCHING_SUCCESS,
  CLIENTS_DELETE_FAILURE,
  CLIENTS_DELETE_LOADING,
  CLIENTS_DELETE_SUCCESS,
  CLIENT_DETAIL_FAILURE,
  CLIENT_DETAIL_LOADING,
  CLIENT_DETAIL_SUCCESS,
  ADDING_CLIENT_FAILURE,
  ADDING_CLIENT_LOADING,
  ADDING_CLIENT_SUCCESS,
  ADDING_CLIENT_RESET,
  EDIT_CLIENT_FAILURE,
  EDIT_CLIENT_LOADING,
  EDIT_CLIENT_RESET,
  EDIT_CLIENT_SUCCESS
} from '../store/actions/client';

export default function useClients() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.clients);
  const {clientList, clientDelete, clientDetail, clientAdd, clientEdit} = state;

  const getClients = async () => {
    dispatch(ADDING_CLIENT_RESET());
    dispatch(EDIT_CLIENT_RESET());
    dispatch(CLIENTS_FETCHING_LOADING());
    try {
      const apiData = await getClientsService();
      dispatch(CLIENTS_FETCHING_SUCCESS(apiData));
    } catch (err) {
      dispatch(CLIENTS_FETCHING_FAILURE(err));
    }
  };

  const deleteClient = async id => {
    dispatch(CLIENTS_DELETE_LOADING());
    try {
      await deleteClientService(id);
      dispatch(CLIENTS_DELETE_SUCCESS());
    } catch (err) {
      dispatch(CLIENTS_DELETE_FAILURE(err));
    }
  };

  const getClient = id => {
    dispatch(CLIENT_DETAIL_LOADING());
    try {
      const data = clientList.data.find(client => client.id == id);
      if (!data) {
        throw new Error('Failed to get client');
      }
      dispatch(CLIENT_DETAIL_SUCCESS(data));
    } catch (err) {
      dispatch(CLIENT_DETAIL_FAILURE(err));
    }
  };

  const addClient = async data => {
    dispatch(ADDING_CLIENT_LOADING());
    try {
      const newClient = await addClientService(data);
      dispatch(CLIENTS_FETCHING_SUCCESS([...clientList.data, newClient]));
      dispatch(ADDING_CLIENT_SUCCESS());
    } catch (err) {
      dispatch(ADDING_CLIENT_FAILURE(err));
    }
  };

  const editClient = async (id, data) => {
    dispatch(EDIT_CLIENT_LOADING());
    try {
      await editClientService(id, data);
      dispatch(EDIT_CLIENT_SUCCESS());
    } catch (err) {
      dispatch(EDIT_CLIENT_FAILURE(err));
    }
  };

  return {
    data: clientList.data,
    loading: clientList.loading,
    error: clientList.error,
    deleteClientLoading: clientDelete.loading,
    deleteClientError: clientDelete.error,
    deleteClientSuccess: clientDelete.success,
    clientDetailData: clientDetail.data,
    clientDetailError: clientDetail.error,
    clientDetailLoading: clientDetail.loading,
    addingClientLoading: clientAdd.loading,
    addingClientSuccess: clientAdd.success,
    addingClientError: clientAdd.error,
    clientEditError: clientEdit.error,
    clientEditSuccess: clientEdit.success,
    clientEditLoading: clientEdit.loading,
    getClients,
    deleteClient,
    getClient,
    addClient,
    editClient
  };
}
