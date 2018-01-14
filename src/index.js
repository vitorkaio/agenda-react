import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import configureStore from './redux/store'

const { persistor, store } = configureStore()

//let user = {user: 'Vih', email: 'vih@email.com'};

/*store.dispatch({
  type: 'REMOVE_CONTACT',
  payload: null
})*/

//console.log(store.getState().userReducer.user);

const onBeforeLift = () => {
  // take some action before the gate lifts
}

ReactDOM.render(
  <Provider store = {store}>
    <PersistGate 
    onBeforeLift={onBeforeLift}
    persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();