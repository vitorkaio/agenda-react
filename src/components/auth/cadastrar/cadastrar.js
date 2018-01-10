import React, { Component } from 'react';
import './cadastrar.css';

import { Link } from 'react-router-dom'

class CadastrarComponent extends Component {

  constructor(props) {
    super(props)
    console.log("CadastrarComponent");
  }

  render() {
    return (
      <div>
        <button>
          <Link to={'/auth/login'}>Login</Link>
        </button>
      </div>
    );
  }
}

export default CadastrarComponent;
