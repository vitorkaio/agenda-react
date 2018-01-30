import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginComponent from './login/login';
import RegisterComponent from './register/register';
import { connect } from 'react-redux';
import * as userActions from './../../redux/actions/userActions';

// Declaration of routes for components of authentication.

class AuthRouter extends Component {

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
        <Switch>
          <Route exact path='/auth/login' render={() => (
            this.isLogged() === false ? 
            <LoginComponent {...this.props}/> :
            <Redirect to='/agenda/home' /> 
          )} />
          <Route exact path='/auth/register' render={() => (
            this.isLogged() === false ?
            <RegisterComponent {...this.props}/> :
            <Redirect to='/agenda/home' /> 
          )} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    );

  }

}

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {
      dispatch(userActions.insertUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthRouter);