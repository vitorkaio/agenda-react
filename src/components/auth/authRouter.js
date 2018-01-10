import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginComponent from './login/login'
import CadastrarComponent from './cadastrar/cadastrar'

// Define as rotas para os componentes de autenticação.

const AuthRouter = () => (
    <Switch>
      <Route exact path='/auth/login' component={LoginComponent}/>
      <Route exact path='/auth/cadastrar' component={CadastrarComponent}/>
      <Redirect to="/auth/login" />
    </Switch>
)

export default AuthRouter