import React, { Component } from 'react';
import './listar.css';
import ApiService from './../../../../shared/services/apiServices';
import { connect } from 'react-redux'
import * as contactActions from './../../../../redux/actions/contactActions'

// import { Link } from 'react-router-dom'

class ListarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {deleted: false};
    this.subscriptionDeleteItem = null;
  }

  getObsDeleteItem() {
    let obs = {
        next: (next) => {
          if(next === true){
           this.props.renders(true);
          }
          else
            console.log("Não foi possível deletar");
      },
      error: (err) => {
        console.log("Não foi possível deletar", err);
      },
      complete: () => {
        console.log("done delete!");
        this.subscriptionDeleteItem.unsubscribe();
      }
    }
    return obs;
  }

  // Delete a contact.
  deleteItem(id) {
    this.subscriptionDeleteItem = ApiService.deleteContact(id).subscribe(this.getObsDeleteItem());
  }

  // Update a contact.
  updateItem(item) {
   this.props.change();
   this.props.insereContatct(item);
  }

  // Generate list of contacts
  generateList() {
    let saida = [];
    for(let x = 0; x < this.props.itens.length; x++) {
      saida.push(
        <div key={x} className="itens">
          <div>{this.props.itens[x].name}</div>
          <button onClick={() => {this.updateItem(this.props.itens[x])}}>Alterar</button>
          <button onClick={() => {this.deleteItem(this.props.itens[x].id)}}>Deletar</button>
        </div>
      );
    }
    return saida;
  }

  render() {
    console.log("lista renders");
    return (
      <div className="lista">
        {this.generateList()}
      </div>
    );
  }
} // End component.

const mapStateToProps = (state) => {
  return {
    contact: state.contactReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    insereContatct: (contact) => {
      dispatch(contactActions.insertContact(contact))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarComponent);