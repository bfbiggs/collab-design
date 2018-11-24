import { combineReducers } from 'redux';
import userReducer from '../services/user/reducer';
import routesReducer from '../containers/Routes/reducer';
import componentOverviewReducer from '../containers/ComponentOverviewPage/reducer';
import componentsReducer from '../containers/Component/reducer';
import pageReducer from '../containers/Overview/reducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  componentOverviewReducer,
  componentsReducer,
  pageReducer,
  routesReducer,
  routing: routerReducer,
  user: userReducer,
});

export default rootReducer;
