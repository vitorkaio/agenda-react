import React, { Component } from 'react';
import './home.css';
import ApiServer from './../../../shared/services/apiServices'
import ListarComponent from './listar/listar'

// import { Link } from 'react-router-dom'

class HomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {contacts: []}
    this.lista = [];
    this.subscription = null;
    this.erroServidor = false;

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
        console.log(err);
        this.erroServidor = false;
      },
      complete: () => {
        this.erroServidor = true;
        this.setState({contacts: this.lista.slice()});
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

  renderizaLista() {
    if(this.erroServidor === false)
      return (<h3>Error no servidor - 404</h3>);
    
    return (
     <ListarComponent itens={this.state.contacts}/>
    );
    
  }

  render() {
    console.log('HomeComponente - Rendenrizado');
    const saida = this.renderizaLista();
    return (
      <div>
        <button onClick={this.goLogin.bind(this)}>Login</button>
        <button onClick={this.goAdicionar.bind(this)}>Adicionar Contato</button>
        <button onClick={this.incrementa.bind(this)}>Incrementa</button>
        {saida}
      </div>
    );
  }
}

export default HomeComponent;
