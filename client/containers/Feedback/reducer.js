import * as types from './actionTypes';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  email: '',
  category: '',
  type: '',
  library: '',
  version: '',
  browser: '',
  description: '',
  files: []
};

const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FEEDBACK_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
        isError: false,
        isSuccess: false,
        ...action.form
      });
    case types.FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isError: false,
        isSuccess: true,
        ...action.form
      });
    case types.FEEDBACK_UPDATE_FORM:
      return Object.assign({}, state, {
        ...action.form
      });
    case types.FEEDBACK_INITIAL_FORM:
      return Object.assign({}, initialState);
    case types.FEEDBACK_ADD_FILE:
      return Object.assign({}, state, {
        files: state.files.concat(action.newFile)
      });
    case types.FEEDBACK_REMOVE_FILE:
      return Object.assign({}, state, {
        files: state.files
          .slice(0, action.fileIndexToRemove)
          .concat(state.files.slice(action.fileIndexToRemove + 1))
      });
    case types.FEEDBACK_ERROR:
      return Object.assign({}, state, {
        isError: true,
        isSuccess: false,
        isLoading: false,
        ...action.form
      });
    default:
      return state;
  }
};

export default contactUsReducer;
