import * as types from './actionTypes';

const initialState = {
  routes: [],
  loading: false,
  error: null
};

const routesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ROUTES_PENDING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
        error: null
      });
    case types.FETCH_ROUTES_ERROR:
      return Object.assign({}, state, {
        ...state,
        loading: false,
        error: action.error.message
      });
    case types.FETCH_ROUTES_SUCCESS:
      return Object.assign({}, state, {
        routes: action.routes,
        loading: false,
        error: null
      });
    default:
      return state;
  }
};

export default routesReducer;
