import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default: localStorage if web, AsyncStorage if react-native

import userReducer from './reducers/userReducer'
import contactReducer from './reducers/contactsReducers'

const config = {
  key: 'root',
  storage,
}

const reducer = persistCombineReducers(config, {contactReducer, userReducer})

export default function configureStore () {
  // ...
  let store = createStore(reducer, {}, applyMiddleware(logger));
  let persistor = persistStore(store)

  return { persistor, store }
}
