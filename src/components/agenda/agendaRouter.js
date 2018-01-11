import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomeComponent from './home/home'
import AddContactComponent from './addContact/addContatc'

// Define as rotas para os componentes de autenticação.

const AgendaRouter = () => (
    <Switch>
      <h3>Navbar</h3>
      <Route exact path='/agenda/home' component={HomeComponent}/>
      <Route exact path='/agenda/add' component={AddContactComponent}/>
      <Redirect to="/agenda/home" />
    </Switch>
)

export default AgendaRouter