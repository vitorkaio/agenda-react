import React, { Component } from 'react';
import './addContact.css';
import Contact from './../../../shared/models/contact';
import { Input, TextArea, Button, Icon } from 'semantic-ui-react';
import Rx from 'rxjs/Rx';
import ApiService from './../../../shared/services/apiServices';

// Component for insertation of a contact.
class AddContactComponent extends Component {

  constructor(props) {
    super(props);
    // console.log(this.props.userReducer);

    // Verifica se é para atualizar ou criar um contato.
    if(this.props.contactReducer === undefined) {
      this.state = {name: "", tel: "", email: "", cep: "", description: "", city: "", erroServidor: false};
      this.estado = "";
      this.andress = "";
      this.erroCep = false;
    }
    else {
      this.state = {
        name: this.props.contactReducer.name, 
        tel: this.props.contactReducer.tel, 
        email: this.props.contactReducer.email, 
        cep: this.props.contactReducer.cep, 
        description: this.props.contactReducer.description, 
        city: this.props.contactReducer.city,
        erroServidor: false
        };
        
        this.estado = this.props.contactReducer.state;
        this.andress = this.props.contactReducer.andress;
        this.erroCep = true;
        this.id = this.props.contactReducer._id;
    }
    

    this.telVazio = false; // Verifica se o name está vazio.
    this.loadingCEP = false; // Faz o ícone de load do campo cep girar.
    this.loadingSubmit = false;

    this.entradaRxjs = new Rx.Subject(); // For input CEP.
    
    // Recebe as subscribe dos obersavables.
    this.subscriptionCEP = null;
    this.subscriptionApiServiceGetCEP = null;
    this.subscriptionApiServiceInsertContact = null;
    this.subscriptionApiServiceUpdateContact = null;
  }

  // Após a inicialização do dom.
  componentDidMount(){
    // console.log('Subscribe in entradaRxjs');
    this.subscriptionCEP = this.entradaRxjs
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(this.getObsCep());
      
  }

  // After component will be destroyed.
  componentWillUnmount() {
    this.subscriptionCEP.unsubscribe(); // Unsubscribe of a observable.
    try {
      this.subscriptionApiServiceInsertContact.unsubscribe();
      this.subscriptionApiServiceUpdateContact.unsubscribe();
    } catch (error) {
      ;
    }
    // console.log('AddContactComponente - WillUnmount');
  }

  // Funcs for observables of the cep.
  getObsCep() {
    let obs = {
      next: (data) =>{
        this.subscriptionApiServiceGetCEP = ApiService.consultaCEP(data).subscribe(this.getObsApiServiceGetCEP());
      },
      error: (err) => {
      },
      complete: () => {
        this.subscriptionApiServiceGetCEP.unsubscribe(); // Unsubscribe of a observable.
      }
    }

    return obs;
  }

  // Funcs for observables of the api.
  getObsApiServiceGetCEP() {
    let obs = {
      next: (data) =>{
        this.loadingCEP = false;
        this.erroCep = true;

        // console.log(data.data);
        this.estado = data.data.uf;
        this.andress = `${data.data.logradouro}, Bairro: ${data.data.bairro}`;
        this.setState({city: data.data.localidade});
      },
      error: (err) => {
        // console.log("erro no cep");
        this.loadingCEP = false;
        this.erroCep = false;
        
        if(err === false) {
          this.estado = "";
          this.andress = "";
          this.setState({city: ""});
        }
      },
      complete: () => {
        // console.log('Done!');
        this.loadingCEP = false;
      }
    }
    return obs;
  }

  // Funcs for observables of the api.
  getObsApiServiceInsertContact() {
    let obs = {
      next: (res) => {
        if(res === true) 
          this.navigateToHome();
      },
      error: (err) => {
        this.setState({erroServidor: true}, () => {this.loadingSubmit = false});
      },
      complete: () =>{
        // console.log('Done!');
      }
    }
    return obs;
  }

  // Funcs for observables of the api.
  getObsApiServiceUpdateContact() {
    let obs = {
      next: (res) => {
        if(res === true)
          this.navigateToHome();
        else
          this.setState({erroServidor: true});
      },
      error: (err) => {
        this.setState({erroServidor: true});
      },
      complete: () =>{
        // console.log('Done!');
      }
    }
    return obs;
  }

  // Navigate for HomeComponent.
  navigateToHome() {
    //this.props.addUser("HOME");
    this.props.removeContact();
    this.props.history.push("/agenda/home");
  }

  // Inserts value of name input in name state value.
  inputName(e) {
    this.setState({name: e.target.value});
    this.telVazio = false;
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
    this.loadingCEP = true;
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
    this.loadingSubmit = true;
    this.setState({erroServidor: this.state.erroServidor});

    if(this.state.tel.length === 0) {
      event.preventDefault(); // Impede de submeter o formulário
      this.telVazio = true;
    }
    else {
      // se for undefined é pq a operação requisita é um cadastro e não um update.
      if(this.props.contactReducer === undefined) {
        let contact = new Contact(this.state.name, this.state.tel, this.state.email, this.andress, this.state.city, this.estado, this.state.description, this.props.userReducer.id, this.state.cep);
        this.subscriptionApiServiceInsertContact = ApiService.insertContact(this.props.userReducer.id, contact).subscribe(this.getObsApiServiceInsertContact());
      }
        else {
          let contact = new Contact(this.state.name, this.state.tel, this.state.email, this.andress, this.state.city, this.estado, this.state.description, this.props.userReducer.id, this.state.cep);
          contact.setId(this.id);
          this.subscriptionApiServiceUpdateContact = ApiService.updateContact(this.props.userReducer.id, contact.toObj()).subscribe(this.getObsApiServiceUpdateContact());
        }      
      }

    event.preventDefault(); // Impede de submeter o formulário
  }

  // Fomulário.
  getForm() {
    return (
      <div className="adicionar">
        <form onSubmit={this.submit.bind(this)}>
          
        <div id="input-contato">
          <Input placeholder='Nome'  type="text" icon='users' value={this.state.name} iconPosition='left' fluid
            onChange={this.inputName.bind(this)} />
        </div>
        
        <div id="input-contato">
          <Input placeholder='*Telefone' type="number" required icon='call' value={this.state.tel} iconPosition='left' fluid
          onChange={this.inputTel.bind(this)} />
        </div>

        {this.telVazio === true ? <h5>Telefone está vazio</h5> : null}

        <div id="input-contato">
          <Input placeholder='Email' type="email" icon='mail' value={this.state.email} iconPosition='left' fluid
          onChange={this.inputEmail.bind(this)} />
        </div>

        <div id="input-contato">
          <Input placeholder='CEP' type="text" value={this.state.cep} fluid
            icon={this.state.cep.length === 0 ? 'search' : (this.erroCep ? "check" : "warning sign")} loading={this.loadingCEP ? true : false}
          onChange={this.inputAndress.bind(this)} />
        </div>

        <div className="ceps">

          <div id="input-cep-cidade">
            <Input placeholder='Cidade' type="text" icon='building' value={this.state.city} iconPosition='left' fluid
            disabled />
          </div>

          <div id="input-cep-estado">
            <Input placeholder='Estado' type="text" icon='map' value={this.estado} iconPosition='left' fluid
            disabled />
          </div>

          <div id="input-cep-endereco">
            <Input placeholder='Endereço' type="text" icon='location arrow' value={this.andress} iconPosition='left' fluid
            disabled />
          </div>

        </div>

        <div id="input-descricao-contato">
          <TextArea autoHeight placeholder="Descrição" value={this.state.description} onChange={this.inputDescription.bind(this)} 
          rows={4} />
        </div>

        <div className="botoes-acoes-contato">
          <Button id="my-butoes-contato" color="black" type="submit" value="Submit" 
            disabled={this.state.tel.length === 0 ? true : false} >
            <Icon loading={this.loadingSubmit ? true : false} name={this.loadingSubmit ? "refresh" : "save"}/> Salvar
          </Button>
          <Button id="my-butoes-contato" color="red" onClick={this.navigateToHome.bind(this)}>
            <Icon name="cancel"/> Cancelar
          </Button>
        </div>

        </form>

        <p id="obr">* campo obrigatório</p>
      </div>
    )
  }

  render() {
    // console.log("AddContatctComponent - Renderizado");
    return (
      <div>
        {this.state.erroServidor === false ? this.getForm() : this.props.history.push("/erro-servidor")}
      </div>
    );
  }
}// end component

export default AddContactComponent;
