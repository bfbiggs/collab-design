import * as types from './actionTypes';
import config from '../../config';

export const updateFeedback = form => dispatch =>
  dispatch({
    type: types.FEEDBACK_UPDATE_FORM,
    form
  });

export const resetFeedback = form => dispatch =>
  dispatch({
    type: types.FEEDBACK_INITIAL_FORM,
    form
  });

export const addFileFeedback = newFile => dispatch =>
  dispatch({
      type: types.FEEDBACK_ADD_FILE,
      newFile
  });

export const removeFileFeedback = fileIndexToRemove => dispatch =>
  dispatch({
    type: types.FEEDBACK_REMOVE_FILE,
    fileIndexToRemove
  });


export const submitFeedback = form => async(dispatch) => {
  dispatch({ type: types.FEEDBACK_LOADING });

  try {
    const response = await fetch(`${config.FEEDBACK_URL}`, {
      method: 'POST', 
      headers: { "Content-Type": "multipart/form-data" }, 
      body: form
    });

    if(response.status !== 200){
      dispatch({ type: types.FEEDBACK_ERROR });
    } else {
      dispatch({ type: types.FEEDBACK_SUCCESS });
    }

  } catch (error) {
    dispatch({ type: types.FEEDBACK_ERROR });
  }
};  