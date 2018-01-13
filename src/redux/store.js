import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import userReducer from './reducers/userReducer'
import contactReducer from './reducers/contactsReducers'

export default createStore(
  combineReducers({contactReducer, userReducer}),
  {},
  applyMiddleware(logger)
)