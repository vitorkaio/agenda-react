import React, { Component } from 'react';
import './register.css';
import { Link } from 'react-router-dom'

class RegisterComponent extends Component {

  constructor(props) {
    super(props)
    console.log("RegisterComponent");
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

export default RegisterComponent;
