import React, { Component } from 'react';
import './home.css';
import ApiServer from './../../../shared/services/apiServices'

// import { Link } from 'react-router-dom'

class HomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {contacts: []}
    this.lista = [];
    this.subscription = null;

    console.log("HomeComponente - Constructor");
    
  }

  // Calling befeore components is render.
  componentWillMount() {
    this.subscription = ApiServer.getAllContacts().subscribe(this.getObsFunctions());
    console.log('HomeComponente - DidMount');
  }

  // After component will be destroyed.
  componentWillUnmount() {
    this.subscription.unsubscribe(); // Unsubscribe of a observable.
    console.log('HomeComponente - WillUnmount')
  }

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
        console.log('erro: ' + err);
        this.erroServidor = '404 - Erro no servidor!';
      },
      complete: () => {
        console.log('Done');
        this.setState({contacts: this.lista.slice()})
      }
    }
    return obs;
  }

  goLogin() {
    // Navega para outra rota.
    this.props.history.push("/auth/login");
  }

  goAdicionar() {
    this.props.history.push("/agenda/add");
  }

  incrementa() {
    //this.props.pushContact(Math.floor((Math.random() * 1000) + 1));
  }

  listar() {
    console.log('listar(): ', this.state.contacts);
    let saida = [];
    for(let x = 0; x < this.state.contacts.length; x++)
      saida.push(<li key={x}>{this.state.contacts[x].name}</li>);
    return saida;
  }

  render() {
    console.log('HomeComponente - Rendenrizado');
    return (
      <div>
        <button onClick={this.goLogin.bind(this)}>Login</button>
        <button onClick={this.goAdicionar.bind(this)}>Adicionar Contato</button>
        <button onClick={this.incrementa.bind(this)}>Incrementa</button>
        <ul>
          {this.listar()}
        </ul>
      </div>
    );
  }
}

export default HomeComponent;
