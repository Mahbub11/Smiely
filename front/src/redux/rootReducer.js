import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appReducer from './slices/app';
import authReducer from './slices/auth';
import userDetailsReducer from './slices/user';
import postReducer from './slices/post';
import chatReducer from './slices/chat'
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth:authReducer,
  userDetails:userDetailsReducer,
  post:postReducer,
  chat:chatReducer,

  
});

export { rootPersistConfig, rootReducer };