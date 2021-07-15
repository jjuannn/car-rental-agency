export const CLIENTS_FETCHING_LOADING = () => {
  return {
    type: 'CLIENTS_FETCHING_LOADING'
  };
};

export const CLIENTS_FETCHING_SUCCESS = payload => {
  return {
    type: 'CLIENTS_FETCHING_SUCCESS',
    payload
  };
};

export const CLIENTS_FETCHING_FAILURE = payload => {
  return {
    type: 'CLIENTS_FETCHING_FAILURE',
    payload
  };
};

export const CLIENTS_DELETE_LOADING = () => {
  return {
    type: 'CLIENTS_DELETE_LOADING'
  };
};

export const CLIENTS_DELETE_SUCCESS = () => {
  return {
    type: 'CLIENTS_DELETE_SUCCESS'
  };
};

export const CLIENTS_DELETE_FAILURE = payload => {
  return {
    type: 'CLIENTS_DELETE_FAILURE',
    payload
  };
};

export const CLIENT_DETAIL_LOADING = () => {
  return {
    type: 'CLIENT_DETAIL_LOADING'
  };
};

export const CLIENT_DETAIL_FAILURE = payload => {
  return {
    type: 'CLIENT_DETAIL_FAILURE',
    payload
  };
};

export const CLIENT_DETAIL_SUCCESS = payload => {
  return {
    type: 'CLIENT_DETAIL_SUCCESS',
    payload
  };
};

export const ADDING_CLIENT_LOADING = () => {
  return {
    type: 'ADDING_CLIENT_LOADING'
  };
};

export const ADDING_CLIENT_FAILURE = payload => {
  return {
    type: 'ADDING_CLIENT_FAILURE',
    payload
  };
};

export const ADDING_CLIENT_SUCCESS = () => {
  return {
    type: 'ADDING_CLIENT_SUCCESS'
  };
};

export const ADDING_CLIENT_RESET = () => {
  return {
    type: 'ADDING_CLIENT_RESET'
  };
};

export const EDIT_CLIENT_LOADING = () => {
  return {
    type: 'EDIT_CLIENT_LOADING'
  };
};

export const EDIT_CLIENT_FAILURE = payload => {
  return {
    type: 'EDIT_CLIENT_FAILURE',
    payload
  };
};

export const EDIT_CLIENT_SUCCESS = () => {
  return {
    type: 'EDIT_CLIENT_SUCCESS'
  };
};

export const EDIT_CLIENT_RESET = () => {
  return {
    type: 'EDIT_CLIENT_RESET'
  };
};
