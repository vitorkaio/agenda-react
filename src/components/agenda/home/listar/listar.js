import React, { Component } from 'react';
import './listar.css';
import ApiService from './../../../../shared/services/apiServices';

// import { Link } from 'react-router-dom'

class ListarComponent extends Component {

  constructor(props) {
    super(props);
  }

  // Delete a contact.
  deleteItem(e) {
    console.log(e);
  }

  generateList() {
    let saida = [];
    for(let x = 0; x < this.props.itens.length; x++) {
      saida.push(
        <div key={x} className="itens">
          <div>{this.props.itens[x].name}</div>
          <button onClick={() => {this.deleteItem(this.props.itens[x].id)}}>Deletar</button>
        </div>
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
