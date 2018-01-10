import React, { Component } from 'react';
import './home.css';

import { Link } from 'react-router-dom'

class HomeComponent extends Component {

  constructor(props) {
    super(props);
    console.log("HomeComponent");
  }

  goLogin() {
    // Navega para outra rota.
    this.props.history.push("/auth/login");
  }

  render() {
    return (
      <div>
        <button onClick={this.goLogin.bind(this)}>Login</button>
      </div>
    );
  }
}

export default HomeComponent;
