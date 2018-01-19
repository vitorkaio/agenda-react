import React, { Component } from 'react';
import './listar.css';
import ApiService from './../../../../shared/services/apiServices';
import { connect } from 'react-redux';
import * as contactActions from './../../../../redux/actions/contactActions';
import { Button, Icon } from 'semantic-ui-react';
import ModalComponent from './../../shared/modal/modal';

// Componente que lista todos os contatos vindos do servidor.

class ListarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {deleted: false, openModal: false};
    
    this.subscriptionDeleteItem = null;
    this.id = null;

    // Remove contato do redux-persist.
  }

  // Metódo que retorna as funções que o Obersavable irá utilizar.
  getObsDeleteItem() {
    let obs = {
        next: (next) => {
          if(next === true){
           this.props.renders(true); // Avisa o HomeComponent que ele precisa atualizar a lista.
          }
          else
            console.log("Não foi possível deletar");
      },
      error: (err) => {
        console.log("Não foi possível deletar", err);
      },
      complete: () => {
        console.log("done delete!");
        this.contato = 0;
        this.index = 0;
        this.subscriptionDeleteItem.unsubscribe();
      }
    }
    return obs;
  }

  //Modal de confirmação.
  abreModal(id) {
    this.id = id;
    this.setState({openModal: true});
  }

  // Delete a contact.
  deleteItem(op) {
    if(op === 1)
      this.subscriptionDeleteItem = ApiService.deleteContact(this.id).subscribe(this.getObsDeleteItem());
    this.setState({openModal: false});
  }

  // Update a contact.
  updateItem(item) {
    this.props.insereContatct(item);
    this.props.change.push('/agenda/add');
  }

  // Generate list of contacts
  generateList() {
    let saida = [];
    for(let x = 0; x < this.props.itens.length; x++) {
      console.log("render lista: ", x);
      saida.push(
        <div key={x} className="item-lista">
          <div className="nome-lista">{this.props.itens[x].name.length === 0 ? "(sem nome)" : this.props.itens[x].name}</div>
    
          <div className="telefone-lista">
            <Icon name="call"/>
            <div>{this.props.itens[x].tel}</div>
          </div>
    
          <div className="email-lista">
            <Icon name="mail"/>
            <div>{this.props.itens[x].email}</div>
          </div>
      
          <div className="acoes-lista">
            <Button basic color='black' onClick={() => {this.updateItem(this.props.itens[x])}}>
              <Icon name='edit' /> Alterar
            </Button>
            <Button basic color='red' onClick={() => {this.abreModal(this.props.itens[x]._id)}}>
              <Icon name="delete"/> Delete
            </Button>
          </div>

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
        {this.state.openModal ? <ModalComponent  msg={"Tem certeza que deseja deletar?"} escolha={(op) => {this.deleteItem(op)}}/> : null }
      </div>
    );
  }
} // End component.

// *************************************** Connect Redux ***************************************

const mapStateToProps = (state) => {
  return {
    contactReducer: state.contactReducer.contact
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    insereContatct: (contact) => {
      dispatch(contactActions.insertContact(contact))
    },
    removeContact: () => {
      dispatch(contactActions.removeContact())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarComponent);