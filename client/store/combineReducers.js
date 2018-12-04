import { combineReducers } from 'redux';
import userReducer from '../services/user/reducer';
import routesReducer from '../containers/Routes/reducer';
import componentOverviewReducer from '../containers/ComponentOverviewPage/reducer';
import componentsReducer from '../containers/Component/reducer';
import feedbackReducer from '../containers/Feedback/reducer';
import iconsReducer from '../containers/Icons/reducer';
import pageReducer from '../containers/Overview/reducer';
import searchResultsReducer from '../containers/SearchResults/reducer';
import { connectRouter } from 'connected-react-router';

const createRootReducer = history => combineReducers({
  componentOverviewReducer,
  componentsReducer,
  feedbackReducer,
  iconsReducer,
  pageReducer,
  routesReducer,
  router: connectRouter(history),
  searchResultsReducer: searchResultsReducer,
  user: userReducer,
});

export default createRootReducer;