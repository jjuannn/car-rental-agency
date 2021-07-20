export const RENTAL_FETCHING_LOADING = () => {
  return {
    type: 'RENTAL_FETCHING_LOADING'
  };
};

export const RENTAL_FETCHING_SUCCESS = payload => {
  return {
    type: 'RENTAL_FETCHING_SUCCESS',
    payload
  };
};

export const RENTAL_FETCHING_FAILURE = payload => {
  return {
    type: 'RENTAL_FETCHING_FAILURE',
    payload
  };
};

export const ADDING_RENTAL_SUCCESS = () => {
  return {
    type: 'ADDING_RENTAL_SUCCESS'
  };
};

export const ADDING_RENTAL_FAILURE = payload => {
  return {
    type: 'ADDING_RENTAL_FAILURE',
    payload
  };
};

export const ADDING_RENTAL_LOADING = () => {
  return {
    type: 'ADDING_RENTAL_LOADING'
  };
};

export const ADDING_RENTAL_RESET = () => {
  return {
    type: 'ADDING_RENTAL_RESET'
  };
};

export const DETAIL_RENTAL_LOADING = () => {
  return {
    type: 'DETAIL_RENTAL_LOADING'
  };
};

export const DETAIL_RENTAL_FAILURE = payload => {
  return {
    type: 'DETAIL_RENTAL_FAILURE',
    payload
  };
};

export const DETAIL_RENTAL_SUCCESS = payload => {
  return {
    type: 'DETAIL_RENTAL_SUCCESS',
    payload
  };
};

export const DELETE_RENTAL_FAILURE = payload => {
  return {
    type: 'DELETE_RENTAL_FAILURE',
    payload
  };
};

export const DELETE_RENTAL_SUCCESS = () => {
  return {
    type: 'DELETE_RENTAL_SUCCESS'
  };
};

export const DELETE_RENTAL_LOADING = () => {
  return {
    type: 'DELETE_RENTAL_LOADING'
  };
};

export const DELETE_RENTAL_RESET = () => {
  return {
    type: 'DELETE_RENTAL_RESET'
  };
};

export const EDIT_RENTAL_LOADING = () => {
  return {
    type: 'EDIT_RENTAL_LOADING'
  };
};

export const EDIT_RENTAL_FAILURE = payload => {
  return {
    type: 'EDIT_RENTAL_FAILURE',
    payload
  };
};

export const EDIT_RENTAL_RESET = () => {
  return {
    type: 'EDIT_RENTAL_RESET'
  };
};

export const EDIT_RENTAL_SUCCESS = () => {
  return {
    type: 'EDIT_RENTAL_SUCCESS'
  };
};
