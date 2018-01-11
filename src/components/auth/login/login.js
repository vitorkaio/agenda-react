import React, { Component } from 'react';
import './login.css';

// import { Link } from 'react-router-dom'

class LoginComponent extends Component {

  goCadastrar() {
    // Navega para outra rota.
    this.props.history.push("/auth/cadastrar");
  }

  goHome() {
    this.props.history.push("/agenda/home");
  }

  render() {
    return (
      <div>
        <button onClick={this.goCadastrar.bind(this)} >Cadastrar</button>
        <button onClick={this.goHome.bind(this)}>Home</button>
      </div>
    );
  }
}

export default LoginComponent;
