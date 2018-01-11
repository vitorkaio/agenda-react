import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import contactReducer from './reducers/contactsReducers'
import otherReducer from './reducers/otherReducer'

export default createStore(
  combineReducers({contactReducer, otherReducer}),
  {},
  applyMiddleware(logger)
)