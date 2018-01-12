import React, { Component } from 'react';
import './listar.css';

// import { Link } from 'react-router-dom'

class ListarComponent extends Component {

  constructor(props) {
    super(props);
  }

  generateList() {
    let saida = [];
    for(let x = 0; x < this.props.itens.length; x++) {
      saida.push(
        <div key={x}>{this.props.itens[x].name}</div>
      );
    }
    return saida;
  }

  render() {
    return (
      <div className="lista">
        {this.generateList()}
      </div>
    );
  }
}

export default ListarComponent;
