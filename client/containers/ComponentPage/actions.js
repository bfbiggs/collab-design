import * as types from './actionTypes';
import config from '../../config';
// import handleErrors from '../../utils/handleErrors';

const setComponentData = (id, component) => {
  return { type: types.FETCH_COMPONENT_SUCCESS, id, component };
};
const setError = error => {
  return { type: types.FETCH_COMPONENT_ERROR, error };
};

const fetchComponentData = id => dispatch => {
  return fetch(`${config.COMPONENTS_URL}/${id}`)
    .then(res => res.json())
    .then(component => {
      console.log(component); // eslint-disable-line no-console
      dispatch(setComponentData(id, component));
      return component;
    })
    .catch(error => dispatch(setError(error)));
};
export default fetchComponentData;
