import React, { Component } from 'react';
import './addContact.css';
import Contact from './../../../shared/models/contact';
import { Input } from 'semantic-ui-react';
import Rx from 'rxjs/Rx';
import ApiService from './../../../shared/services/apiServices'

// Component for insertation of a contact.
class AddContactComponent extends Component {

  constructor(props) {
    super(props);
    console.log("AddContactComponent");
    this.state = {name: "", tel: "", email: "", cep: "", description: ""};
    this.nameVazio = false; // Verifica se o name está vazio.
    this.loadingCEP = false;
    this.entradaRxjs = new Rx.Subject(); // For input CEP.
    this.subscriptionCEP = null;
    this.subscriptionApiService = null;
  }

  // Após a inicialização do dom.
  componentDidMount(){
    console.log('Subscribe in entradaRxjs');
    this.subscriptionCEP = this.entradaRxjs
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(this.getObsCep());
      
  }

  // After component will be destroyed.
  componentWillUnmount() {
    this.subscriptionCEP.unsubscribe(); // Unsubscribe of a observable.
    console.log('AddContactComponente - WillUnmount')
  }

  getObsCep() {
    let obs = {
      next: (data) =>{
        this.subscriptionApiService = ApiService.consultaCEP(data).subscribe(this.getObsApiService());
      },
      error: (err) => {

      },
      complete: () =>{
        this.subscriptionApiService.unsubscribe(); // Unsubscribe of a observable.
      }
    }

    return obs;
  }

  getObsApiService() {
    let obs = {
      next: (data) =>{
        console.log(data.data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () =>{
        console.log('Done!');
      }
    }
    return obs;
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
    this.setState({cep: event.target.value}, () => {
      this.entradaRxjs.next(this.state.cep);
    });
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
    else {
      let contact = new Contact(this.state.name, this.state.tel, this.state.email, this.state.andress, this.state.description);
      console.log(contact.toJson());
    }

    event.preventDefault(); // Impede de submeter o formulário
    
  }

  render() {
    console.log("Renderizando formulário");
    return (
      <div className="adicionar">
        <form onSubmit={this.submit.bind(this)}>
          
          <Input placeholder='Nome'  type="text" icon='users' value={this.state.name} iconPosition='left'
          onChange={this.inputName.bind(this)} />
          
          {this.nameVazio === true ? <h5>name está vazio</h5> : null}
          
          <Input placeholder='Telefone' type="number" required icon='call' value={this.state.tel} iconPosition='left' 
          onChange={this.inputTel.bind(this)} />

          <Input placeholder='Email' type="email" required icon='mail' value={this.state.email} iconPosition='left' 
          onChange={this.inputEmail.bind(this)} />

          <Input placeholder='CEP' type="text" required icon='map' value={this.state.cep} iconPosition='left' 
          onChange={this.inputAndress.bind(this)} />

          <textarea placeholder="Descrição" value={this.state.description} onChange={this.inputDescription.bind(this)}></textarea>
          
          <input type="submit" value="Submit" />
        </form>
        
        <button onClick={this.navigateToHome.bind(this)}>home</button>
      </div>
    );
  }
}

export default AddContactComponent;
