import React, { Component } from 'react';
import './adicionar.css';
import Contato from './../../../shared/models/contato'
import { Input } from 'semantic-ui-react'

class AdicionarComponent extends Component {

  constructor(props) {
    super(props);
    console.log("HomeComponent");
    // Exemplo para bloquear um rota.
    //let user = "kaio";
    //if(user != "vih")
    //  this.props.history.push("/auth/login");
    this.state = {nome: "", telefone: ""};
    this.nomeVazio = false; // Verifica se o nome está vazio.
  }

  goHome() {
    this.props.history.push("/agenda/home");
  }

  nome(e) {
    this.setState({nome: e.target.value});
    this.nomeVazio = false;
  }

  telefone(e) {
    this.setState({telefone: e.target.value});
  }

  submitt(e) {
    /*const data = new FormData(e.target);
    console.log(data.get('telefone'), 'validade: ' + e.target.checkValidity());
    console.log(data);
    console.log(e.target);*/
    if(this.state.nome.length == 0){
      e.preventDefault(); // Impede de submeter o formulário
      this.nomeVazio = true;
      this.setState({nome: ""}); // Só para forçar um render.
    }
    else
      console.log(this.state);
    
  }

  render() {
    console.log("Nome-size: ", this.state.nome.length);
    return (
      <div className="adicionar">
        <form onSubmit={this.submitt.bind(this)}>
          <Input type="text" icon='users' value={this.state.nome} iconPosition='left' placeholder='Nome' onChange={this.nome.bind(this)} />
          {this.nomeVazio === true ? <h5>Nome está vazio</h5> : null}
          <Input type="number" required icon='call' value={this.state.telefone} iconPosition='left' placeholder='Telefone' onChange={this.telefone.bind(this)} />
          <input type="submit" value="Submit" />
        </form>
        
        <button onClick={this.goHome.bind(this)}>home</button>
      </div>
    );
  }
}

export default AdicionarComponent;
