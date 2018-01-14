import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import HomeComponent from './home/home'
import AddContactComponent from './addContact/addContatc'
import NavbarComponent from './shared/navbar/navbar'

// Define as rotas para os componentes de autenticação.

const AgendaRouter = () => (
  <div>
    <NavbarComponent/>
    <Switch>
      <Route exact path='/agenda/home' component={HomeComponent}/>
      <Route exact path='/agenda/add' component={AddContactComponent}/>
      <Redirect to="/agenda/home" />
    </Switch>
  </div>  
  
)

export default AgendaRouter