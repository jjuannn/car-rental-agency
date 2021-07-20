const INITIAL_VALUES = {
  rentalList: {
    loading: false,
    error: null,
    data: null
  },
  rentalAdd: {
    sending: false,
    error: null,
    success: false
  },
  rentalDetail: {
    loading: false,
    error: null,
    data: null
  },
  rentalDelete: {
    loading: false,
    error: null,
    success: false
  },
  rentalEdit: {
    sending: false,
    error: null,
    success: false
  }
};

const RentalsReducer = (state = INITIAL_VALUES, {type, payload}) => {
  switch (type) {
    case 'RENTAL_FETCHING_LOADING':
      return {
        ...state,
        rentalList: {
          loading: true,
          error: null,
          data: null
        }
      };
    case 'RENTAL_FETCHING_SUCCESS':
      return {
        ...state,
        rentalList: {
          loading: false,
          error: null,
          data: payload
        }
      };
    case 'RENTAL_FETCHING_FAILURE':
      return {
        ...state,
        rentalList: {
          loading: false,
          error: payload,
          data: null
        }
      };
    case 'ADDING_RENTAL_LOADING':
      return {
        ...state,
        rentalAdd: {
          sending: true,
          error: null,
          success: false
        }
      };
    case 'ADDING_RENTAL_FAILURE':
      return {
        ...state,
        rentalAdd: {
          sending: false,
          error: payload,
          success: false
        }
      };
    case 'ADDING_RENTAL_RESET':
      return {
        ...state,
        rentalAdd: {
          sending: false,
          error: null,
          success: false
        }
      };
    case 'ADDING_RENTAL_SUCCESS':
      return {
        ...state,
        rentalAdd: {
          sending: false,
          error: null,
          success: true
        }
      };
    case 'DETAIL_RENTAL_LOADING':
      return {
        ...state,
        rentalDetail: {
          loading: true,
          error: null,
          data: null
        }
      };
    case 'DETAIL_RENTAL_SUCCESS':
      return {
        ...state,
        rentalDetail: {
          loading: false,
          error: null,
          data: payload
        }
      };
    case 'DETAIL_RENTAL_FAILURE':
      return {
        ...state,
        rentalDetail: {
          loading: false,
          error: payload,
          data: null
        }
      };
    case 'DELETE_RENTAL_LOADING':
      return {
        ...state,
        rentalDelete: {
          loading: true,
          error: null,
          success: false
        }
      };
    case 'DELETE_RENTAL_SUCCESS':
      return {
        ...state,
        rentalDelete: {
          loading: false,
          error: null,
          success: true
        }
      };
    case 'DELETE_RENTAL_FAILURE':
      return {
        ...state,
        rentalDelete: {
          loading: false,
          error: payload,
          success: false
        }
      };
    case 'DELETE_RENTAL_RESET':
      return {
        ...state,
        rentalDelete: {
          loading: false,
          error: null,
          success: false
        }
      };
    case 'EDIT_RENTAL_LOADING':
      return {
        ...state,
        rentalEdit: {
          sending: true,
          error: null,
          success: false
        }
      };
    case 'EDIT_RENTAL_SUCCESS':
      return {
        ...state,
        rentalEdit: {
          sending: false,
          error: null,
          success: true
        }
      };
    case 'EDIT_RENTAL_FAILURE':
      return {
        ...state,
        rentalEdit: {
          sending: false,
          error: payload,
          success: false
        }
      };
    case 'EDIT_RENTAL_RESET':
      return {
        ...state,
        rentalEdit: {
          sending: false,
          error: null,
          success: false
        }
      };
    default:
      return state;
  }
};

export default RentalsReducer;
