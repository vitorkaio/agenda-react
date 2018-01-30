import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import HomeComponent from './home/home';
import AddContactComponent from './addContact/addContatc';
import NavbarComponent from './shared/navbar/navbar';
import ContaComponent from './conta/conta';
import { connect } from 'react-redux';
import * as userActions from './../../redux/actions/userActions';
import * as contactActions from './../../redux/actions/contactActions';
// Define as rotas para os componentes de autenticação.

class AgendaRouter extends Component {

  // Verifica se o usuário está logado.
  isLogged() {
    try {
      if(this.props.userReducer.user === null)
        return false;
      return true;
      
    } catch (error) {
      return false;
    }
  }

  render() {
    // console.log('**** Agenda Router ****');
    return (
      <div>
        <NavbarComponent {...this.props}/>
        <Switch>
          <Route exact path='/agenda/home' render={() => (
            this.isLogged() ? 
            <HomeComponent {...this.props}/> :
            <Redirect to='/auth/login' /> 
          )} />
          <Route exact path='/agenda/add' render={() => (
            this.isLogged() ?
            <AddContactComponent {...this.props}/> :
            <Redirect to='/auth/login' /> 
          )} />
          <Route exact path='/agenda/conta' render={() => (
            this.isLogged() ?
            <ContaComponent {...this.props}/> :
            <Redirect to='/auth/login' /> 
          )} />
          <Redirect to="/agenda/home" />
        </Switch>
      </div>
    );

  }
  
}// End component.

const mapStateToProps = (state) => {
  try {
    return {
      userReducer: state.userReducer.user,
      contactReducer: state.contactReducer.contact
    };
  } catch(error) {
    <Redirect to="auth/login"/>
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {
      dispatch(userActions.insertUser(user))
    },
    insereContatct: (contact) => {
      dispatch(contactActions.insertContact(contact))
    },
    removeUser: () => {
      dispatch(userActions.removeUser())
    },
    removeContact: () => {
      dispatch(contactActions.removeContact())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendaRouter);