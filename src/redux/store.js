import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import userReducer from './reducers/userReducer'
import otherReducer from './reducers/otherReducer'

export default createStore(
  combineReducers({userReducer, otherReducer}),
  {},
  applyMiddleware(logger)
)