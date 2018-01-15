import React, { Component } from 'react';
import './home.css';
import ApiServer from './../../../shared/services/apiServices'
import ListarComponent from './listar/listar'

import { Icon, Input } from 'semantic-ui-react';

// import { Link } from 'react-router-dom'

class HomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {contacts: [], update: false};
    this.lista = [];
    this.subscription = null;
    this.erroServidor = false;

    //console.log("HomeComponente - Constructor");
    
  }

  // É chamado antes do componente ser renderizado.
  componentWillMount() {
    this.subscription = ApiServer.getAllContacts().subscribe(this.getObsFunctions()); // Pegando os contatos da api.
    //console.log('HomeComponente - WillMount');
  }

  // After component will be destroyed.
  //componentWillUnmount() {}

  // Retorna as funções que o Obeservable irá utilizar para pegar os contatos.
  getObsFunctions() {
    let obs = {
        next: (next) => {
          this.lista = [];
          next.forEach(element => {
          //console.log(element['_id'], element['nome']);
          this.lista.push(element);
        });
      },
      error: (err) => {
        console.log(err);
        this.erroServidor = false;
      },
      complete: () => {
        this.erroServidor = true;
        this.setState({contacts: this.lista.slice()}, () => {
          this.subscription.unsubscribe(); // Unsubscribe of a observable.
        });
      }
    }
    return obs;
  }

  // Renders list of contatcs
  renderizaLista() {
    if(this.erroServidor === false)
      return (<div> <Icon loading name='spinner' size="huge"/> </div>);
    
    return (
     <ListarComponent itens={this.state.contacts} renders={this.updateContatcs.bind(this)} change={this.props.history}/>
    );
  }

  // Update list
  updateContatcs(value) {
    console.log(value);
    this.subscription = ApiServer.getAllContacts().subscribe(this.getObsFunctions());
    this.setState({update: value})
  }

  render() {
    console.log('HomeComponente - Rendenrizado');
    const saida = this.renderizaLista(); // Renderiza a lista se ela existir.
    const loadSpinner = this.state.contacts.length; // Se a lista tiver vazia, mostra um spinner de load.
    return (
      <div className={loadSpinner === 0 ? "loadSpiner" : "listagem"}>
        {loadSpinner === 0 ? null : <Input className="pesquisa" loading icon='user' placeholder='Search...' />}
        {saida}
      </div>
    );
  }
}

export default HomeComponent;
