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
    this.state = {name: "", tel: "", email: "", cep: "", description: "", city: ""};
    this.estado = "";
    this.andress = "";

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

  // Funcs for observables of the cep.
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

  // Funcs for observables of the api.
  getObsApiService() {
    let obs = {
      next: (data) =>{
        console.log(data.data);
        this.estado = data.data.uf;
        this.andress = `${data.data.logradouro}, Bairro: ${data.data.bairro}`;
        this.setState({city: data.data.localidade});
      },
      error: (err) => {
        if(err === false) {
          this.estado = "";
          this.andress = "";
          this.setState({city: ""});
        }
      },
      complete: () =>{
        console.log('Done!');
      }
    }
    return obs;
  }

  // Navigate for HomeComponent.
  navigateToHome() {
    this.props.history.push("/agenda/home");
  }

  // Inserts value of name input in name state value.
  inputName(e) {
    this.setState({name: e.target.value});
    this.nameVazio = false;
  }

  // Inserts value of tel input in tel state value.
  inputTel(e) {
    this.setState({tel: e.target.value});
  }

  // Inserts value of email input in email state value.
  inputEmail(e) {
    this.setState({email: e.target.value});
  }

  // Inserts value of andress input in andress state value.
  inputAndress(e) {
    this.setState({cep: e.target.value}, () => {
      this.entradaRxjs.next(this.state.cep);
    });
  }

  // Inserts value of drescription input in drescription state value.
  inputDescription(e) {
    this.setState({description: e.target.value});
  }
  
  // Submit data.
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

        <div className="ceps">
          <Input placeholder='CEP' type="text" required icon='map' value={this.state.cep} iconPosition='left' 
          onChange={this.inputAndress.bind(this)} />

          <Input placeholder='Cidade' type="text" required icon='map' value={this.state.city} iconPosition='left' 
          disabled />

          <Input placeholder='Estado' type="text" required icon='map' value={this.estado} iconPosition='left' 
          disabled />

          <Input placeholder='Endereço' type="text" required icon='map' value={this.andress} iconPosition='left' 
          disabled />

        </div>

        <textarea placeholder="Descrição" value={this.state.description} onChange={this.inputDescription.bind(this)}></textarea>
          
          <input type="submit" value="Submit" />

        </form>
        
        <button onClick={this.navigateToHome.bind(this)}>home</button>
      </div>
    );
  }
}

export default AddContactComponent;
