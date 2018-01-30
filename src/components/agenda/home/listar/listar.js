import React, { Component } from 'react';
import './listar.css';
import { Button, Icon, Statistic } from 'semantic-ui-react';

// Componente que lista todos os contatos vindos do servidor.

class ListarComponent extends Component {

  // Abre um info com as informações do contato.
  abreInfo(contato) {
    this.props.info(contato);
  }

  // Update a contact.
  updateItem(item) {
    this.props.alteraContato(item);
  }

  // Gera a lista de contatos.
  generateList() {
    let saida = [];
    for(let x = 0; x < this.props.itens.length; x++) {
      // console.log("render lista: ", x);
      saida.push(
        <div key={x} className="item-lista">
          <div className="nome-lista">
            <div className="nome-item" onClick={() => this.abreInfo(this.props.itens[x])}>
              {this.props.itens[x].name.length === 0 ? "(sem nome)" : this.props.itens[x].name}
            </div>
          </div>
    
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
            <Button basic color='red' onClick={() => {this.props.deletaContato(this.props.itens[x])}}>
              <Icon name="delete"/> Delete
            </Button>
          </div>

        </div>
      );
    }
    return saida;
  }

  render() {
    // console.log("lista renders");
    return (
      <div className="home-lista">
        <Statistic className="stats" size='mini'>
          <Statistic.Value>{this.props.itens.length}</Statistic.Value>
          <Statistic.Label>Contatos</Statistic.Label>
        </Statistic> 
        <div className="lista">
          {this.generateList()}
        </div>
      </div>
    );
  }
} // End component.


export default ListarComponent;