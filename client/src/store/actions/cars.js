export const FETCHING_LOADING = () => {
  return {
    type: 'FETCHING_LOADING'
  };
};

export const FETCHING_SUCCESS = payload => {
  return {
    type: 'FETCHING_SUCCESS',
    payload
  };
};

export const FETCHING_FAILURE = payload => {
  return {
    type: 'FETCHING_FAILURE',
    payload
  };
};

export const ADDING_CAR_LOADING = () => {
  return {
    type: 'ADDING_CAR_LOADING'
  };
};

export const ADDING_CAR_SUCCESS = () => {
  return {
    type: 'ADDING_CAR_SUCCESS'
  };
};

export const ADDING_CAR_FAILURE = payload => {
  return {
    type: 'ADDING_CAR_FAILURE',
    payload
  };
};

export const ADDING_CAR_RESET = () => {
  return {
    type: 'ADDING_CAR_RESET'
  };
};

export const DELETING_CAR_FAILURE = payload => {
  return {
    type: 'DELETING_CAR_FAILURE',
    payload
  };
};

export const DELETING_CAR_LOADING = () => {
  return {
    type: 'DELETING_CAR_LOADING'
  };
};

export const DELETING_CAR_SUCCESS = () => {
  return {
    type: 'DELETING_CAR_SUCCESS'
  };
};

export const DETAIL_CAR_LOADING = () => {
  return {
    type: 'DETAIL_CAR_LOADING'
  };
};

export const DETAIL_CAR_SUCCESS = payload => {
  return {
    type: 'DETAIL_CAR_SUCCESS',
    payload
  };
};

export const DETAIL_CAR_ERROR = payload => {
  return {
    type: 'DETAIL_CAR_ERROR',
    payload
  };
};

export const EDIT_CAR_LOADING = () => {
  return {
    type: 'EDIT_CAR_LOADING'
  };
};

export const EDIT_CAR_FAILURE = payload => {
  return {
    type: 'EDIT_CAR_FAILURE',
    payload
  };
};

export const EDIT_CAR_SUCCESS = () => {
  return {
    type: 'EDIT_CAR_SUCCESS'
  };
};

export const EDIT_CAR_RESET = () => {
  return {
    type: 'EDIT_CAR_RESET'
  };
};
