import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomeComponent from './home/home'
import AdicionarComponent from './adicionar/adicionar'

// Define as rotas para os componentes de autenticação.

const AgendaRouter = () => (
    <Switch>
      <Route exact path='/agenda/home' component={HomeComponent}/>
      <Route exact path='/agenda/adicionar' component={AdicionarComponent}/>
      <Redirect to="/agenda/home" />
    </Switch>
)

export default AgendaRouter