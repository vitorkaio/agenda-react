import React, { Component } from 'react';
import './cadastrar.css';

import { Link } from 'react-router-dom'

class CadastrarComponent extends Component {
  render() {
    return (
      <div>
        <button>
          <Link to={'/auth/login'}>Login</Link>
        </button>
        <button>Home</button>
      </div>
    );
  }
}

export default CadastrarComponent;
