import React, { Component } from 'react';
import './addContact.css';
import Contact from './../../../shared/models/contact'
import { Input } from 'semantic-ui-react'

// Component for insertation of a contact.
class AddContactComponent extends Component {

  constructor(props) {
    super(props);
    console.log("HomeComponent");
    // Exemplo para bloquear um rota.
    //let user = "kaio";
    //if(user != "vih")
    //  this.props.history.push("/auth/login");
    this.state = {name: "", tel: "", email: "", endereco: "", descricao: ""};
    this.nameVazio = false; // Verifica se o name está vazio.
  }

  goHome() {
    this.props.history.push("/agenda/home");
  }

  name(e) {
    this.setState({name: e.target.value});
    this.nameVazio = false;
  }

  tel(e) {
    this.setState({tel: e.target.value});
  }

  submitt(e) {
    /*const data = new FormData(e.target);
    console.log(data.get('tel'), 'validade: ' + e.target.checkValidity());
    console.log(data);
    console.log(e.target);*/
    if(this.state.name.length == 0){
      e.preventDefault(); // Impede de submeter o formulário
      this.nameVazio = true;
      this.setState({name: ""}); // Só para forçar um render.
    }
    else
      console.log(this.state);
    
  }

  render() {
    console.log("name-size: ", this.state.name.length);
    return (
      <div className="adicionar">
        <form onSubmit={this.submitt.bind(this)}>
          <Input type="text" icon='users' value={this.state.name} iconPosition='left' placeholder='name' onChange={this.name.bind(this)} />
          {this.nameVazio === true ? <h5>name está vazio</h5> : null}
          <Input type="number" required icon='call' value={this.state.tel} iconPosition='left' placeholder='tel' onChange={this.tel.bind(this)} />
          <input type="submit" value="Submit" />
        </form>
        
        <button onClick={this.goHome.bind(this)}>home</button>
      </div>
    );
  }
}

export default AddContactComponent;
