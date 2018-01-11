import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginComponent from './login/login'
import RegisterComponent from './register/register'

// Declaration of routes for components of authentication.

const AuthRouter = () => (
    <Switch>
      <Route exact path='/auth/login' component={LoginComponent}/>
      <Route exact path='/auth/register' component={RegisterComponent}/>
      <Redirect to="/auth/login" />
    </Switch>
)

export default AuthRouter