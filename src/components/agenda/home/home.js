import React, { Component } from 'react';
import './home.css';

import { Link } from 'react-router-dom'

class HomeComponent extends Component {

  constructor(props) {
    super(props);
    console.log("HomeComponent");
    // Exemplo para bloquear um rota.
    //let user = "kaio";
    //if(user != "vih")
    //  this.props.history.push("/auth/login");
  }

  goLogin() {
    // Navega para outra rota.
    this.props.history.push("/auth/login");
  }

  goAdicionar() {
    this.props.history.push("/agenda/adicionar");
  }

  render() {
    return (
      <div>
        <button onClick={this.goLogin.bind(this)}>Login</button>
        <button onClick={this.goAdicionar.bind(this)}>Adicionar</button>
      </div>
    );
  }
}

export default HomeComponent;
