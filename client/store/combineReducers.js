import { combineReducers } from 'redux';
import userReducer from '../services/user/reducer';
import routesReducer from '../containers/Routes/reducer';
import componentOverviewReducer from '../containers/ComponentOverviewPage/reducer';
import componentsReducer from '../containers/ComponentPage/reducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  user: userReducer,
  routing: routerReducer,
  routesReducer: routesReducer,
  componentOverviewReducer: componentOverviewReducer,
  componentsReducer: componentsReducer,
});

export default rootReducer;
