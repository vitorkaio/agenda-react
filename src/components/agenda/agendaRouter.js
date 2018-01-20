import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'

import HomeComponent from './home/home'
import AddContactComponent from './addContact/addContatc'
import NavbarComponent from './shared/navbar/navbar'

// Define as rotas para os componentes de autenticação.

const AgendaRouter = (props) => (
  <div>
    <NavbarComponent rotaProps={props.history}/>
    <Switch>
      <Route exact path='/agenda/home' component={HomeComponent}/>
      <Route exact path='/agenda/add' component={AddContactComponent}/>
      <Redirect to="/agenda/home" />
    </Switch>
  </div>
  
);

export default AgendaRouter