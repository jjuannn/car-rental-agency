const INITIAL_VALUES = {
  clientList: {
    loading: false,
    error: null,
    data: null
  },
  clientDelete: {
    loading: false,
    error: null,
    success: false
  },
  clientDetail: {
    loading: false,
    error: null,
    data: null
  },
  clientAdd: {
    loading: false,
    error: null,
    success: false
  },
  clientEdit: {
    loading: false,
    error: null,
    success: false
  }
};

const clientsReducer = (state = INITIAL_VALUES, {type, payload}) => {
  switch (type) {
    case 'CLIENTS_FETCHING_LOADING':
      return {
        ...state,
        clientList: {
          loading: true,
          error: null,
          data: null
        }
      };
    case 'CLIENTS_FETCHING_FAILURE':
      return {
        ...state,
        clientList: {
          loading: false,
          error: payload,
          data: null
        }
      };
    case 'CLIENTS_FETCHING_SUCCESS':
      return {
        ...state,
        clientList: {
          loading: false,
          error: null,
          data: payload
        }
      };
    case 'CLIENTS_DELETE_LOADING':
      return {
        ...state,
        clientDelete: {
          loading: true,
          success: false,
          error: null
        }
      };
    case 'CLIENTS_DELETE_FAILURE':
      return {
        ...state,
        clientDelete: {
          loading: false,
          success: false,
          error: payload
        }
      };
    case 'CLIENTS_DELETE_SUCCESS':
      return {
        ...state,
        clientDelete: {
          loading: false,
          success: true,
          error: null
        }
      };
    case 'CLIENT_DETAIL_LOADING':
      return {
        ...state,
        clientDetail: {
          loading: true,
          error: null,
          data: null
        }
      };
    case 'CLIENT_DETAIL_SUCCESS':
      return {
        ...state,
        clientDetail: {
          loading: false,
          error: null,
          data: payload
        }
      };
    case 'CLIENT_DETAIL_FAILURE':
      return {
        ...state,
        clientDetail: {
          loading: false,
          error: payload,
          data: null
        }
      };
    case 'ADDING_CLIENT_LOADING':
      return {
        ...state,
        clientAdd: {
          loading: true,
          error: null,
          success: false
        }
      };
    case 'ADDING_CLIENT_FAILURE':
      return {
        ...state,
        clientAdd: {
          loading: false,
          error: payload,
          success: false
        }
      };
    case 'ADDING_CLIENT_SUCCESS':
      return {
        ...state,
        clientAdd: {
          loading: false,
          error: null,
          success: true
        }
      };
    case 'ADDING_CLIENT_RESET':
      return {
        ...state,
        clientAdd: {
          loading: false,
          error: null,
          success: false
        }
      };
    case 'EDIT_CLIENT_LOADING':
      return {
        ...state,
        clientEdit: {
          loading: true,
          error: null,
          success: false
        }
      };
    case 'EDIT_CLIENT_FAILURE':
      return {
        ...state,
        clientEdit: {
          loading: false,
          error: payload,
          success: false
        }
      };
    case 'EDIT_CLIENT_RESET':
      return {
        ...state,
        clientEdit: {
          loading: false,
          error: null,
          success: false
        }
      };
    case 'EDIT_CLIENT_SUCCESS':
      return {
        ...state,
        clientEdit: {
          loading: false,
          error: null,
          success: true
        }
      };
    default:
      return state;
  }
};

export default clientsReducer;
