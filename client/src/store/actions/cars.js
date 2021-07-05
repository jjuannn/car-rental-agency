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
