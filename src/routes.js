import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AuthRouter  from './components/auth/authRouter';
import AgendaRouter from './components/agenda/agendaRouter';
import ErroServidorComponent from './components/shared/erroServidor/erroServidor';

// Declaration of routes for at sub-routes of app.

const Routes = () => (
  <main>
    <Switch>
      <Route path='/auth' component={AuthRouter}/>
      <Route path='/agenda' component={AgendaRouter}/>
      <Route exact path='/erro-servidor' component={ErroServidorComponent}/>
      <Redirect to="/auth" />
    </Switch>
  </main>
)

export default Routes