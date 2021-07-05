const INITIAL_VALUES = {
  carList: {
    loading: false,
    error: null,
    data: null
  },
  carAdded: {
    loading: false,
    error: null,
    success: false
  }
};

const carsReducer = (state = INITIAL_VALUES, {type, payload}) => {
  switch (type) {
    case 'FETCHING_LOADING':
      return {
        ...state,
        carList: {
          loading: true,
          error: null,
          data: null
        }
      };
    case 'FETCHING_SUCCESS':
      return {
        ...state,
        carList: {
          loading: false,
          error: null,
          data: payload
        }
      };
    case 'FETCHING_FAILURE':
      return {
        ...state,
        carList: {
          loading: false,
          error: payload,
          data: null
        }
      };
    case 'ADDING_CAR_LOADING':
      console.log('ADDING CAR LOADING');
      return {
        ...state,
        carAdded: {
          loading: true,
          error: null,
          success: false
        }
      };
    case 'ADDING_CAR_FAILURE':
      console.log(payload);
      console.log('ADD CAR FALIUURE');
      return {
        ...state,
        carAdded: {
          loading: false,
          error: payload,
          success: false
        }
      };
    case 'ADDING_CAR_SUCCESS':
      console.log('ADDING CAR SUCCESS');
      return {
        ...state,
        carAdded: {
          loading: false,
          error: null,
          success: true
        }
      };
    case 'ADDING_CAR_RESET':
      console.log('ADDING CAR RESET');
      return {
        ...state,
        carAdded: {
          loading: false,
          error: null,
          success: false
        }
      };
    default:
      return state;
  }
};

export default carsReducer;
