import React, { Component } from 'react';
import './addContact.css';
// import Contact from './../../../shared/models/contact'
import { Input } from 'semantic-ui-react'

// Component for insertation of a contact.
class AddContactComponent extends Component {

  constructor(props) {
    super(props);
    console.log("HomeComponent");
    this.state = {name: "", tel: "", email: "", andress: "", description: ""};
    this.nameVazio = false; // Verifica se o name está vazio.
  }

  /**
    * Navigate for HomeComponent.
    * @memberof AddContactComponent
  */
  navigateToHome() {
    this.props.history.push("/agenda/home");
  }

  /**
    * Inserts value of name input in name state value.
    * @param {any} event Event with value of input.
    * @memberof AddContactComponent
  */
  inputName(event) {
    this.setState({name: event.target.value});
    this.nameVazio = false;
  }

  /**
    * Inserts value of tel input in tel state value.
    * @param {any} event Event with value of input.
    * @memberof AddContactComponent
  */
  inputTel(event) {
    this.setState({tel: event.target.value});
  }

  /**
    * Inserts value of email input in email state value.
    * @param {any} event Event with value of input.
    * @memberof AddContactComponent
  */
  inputEmail(event) {
    this.setState({email: event.target.value});
  }

  /**
    * Inserts value of andress input in andress state value.
    * @param {any} event Event with value of input.
    * @memberof AddContactComponent
  */
  inputAndress(event) {
    this.setState({andress: event.target.value});
  }

  /**
    * Inserts value of drescription input in drescription state value.
    * @param {any} event Event with value of input.
    * @memberof AddContactComponent
  */
  inputDescription(event) {
    this.setState({description: event.target.value});
  }
  
  /**
    * Submit data.
    * @param {any} event Event with value of input.
    * @memberof AddContactComponent
  */
  submit(event) {
    if(this.state.name.length === 0) {
      event.preventDefault(); // Impede de submeter o formulário
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
        <form onSubmit={this.submit.bind(this)}>
          
          <Input type="text" icon='users' value={this.state.name} iconPosition='left' placeholder='Nome' 
          onChange={this.inputName.bind(this)} />
          
          {this.nameVazio === true ? <h5>name está vazio</h5> : null}
          
          <Input type="number" required icon='call' value={this.state.tel} iconPosition='left' placeholder='Telefone' 
          onChange={this.inputTel.bind(this)} />

          <Input type="email" required icon='mail' value={this.state.email} iconPosition='left' placeholder='Email' 
          onChange={this.inputEmail.bind(this)} />
          
          <input type="submit" value="Submit" />
        </form>
        
        <button onClick={this.navigateToHome.bind(this)}>home</button>
      </div>
    );
  }
}

export default AddContactComponent;
