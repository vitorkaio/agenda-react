import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import AuthRouter  from './components/auth/authRouter'
import AgendaRouter from './components/agenda/agendaRouter'

// Define as rotas da aplicação.

const Routes = () => (
  <main>
    <Switch>
      <Route path='/auth' component={AuthRouter}/>
      <Route path='/agenda' component={AgendaRouter}/>
      <Redirect to="/auth" />
    </Switch>
  </main>
)

export default Routes