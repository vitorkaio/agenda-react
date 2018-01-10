import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomeComponent from './home/home'

// Define as rotas para os componentes de autenticação.

const AgendaRouter = () => (
    <Switch>
      <Route exact path='/agenda/home' component={HomeComponent}/>
      <Route exact path='/agenda/adicionar' component={HomeComponent}/>
      <Redirect to="/agenda/home" />
    </Switch>
)

export default AgendaRouter