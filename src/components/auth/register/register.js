import React, { Component } from 'react';
import './register.css';
import { Link } from 'react-router-dom'
import { Input, Button, Icon } from 'semantic-ui-react';
import registerSVG from './../../../assets/auth/register.svg';
import apiServices from '../../../shared/services/apiServices';

class RegisterComponent extends Component {

  constructor(props) {
    super(props)
    console.log("RegisterComponent");
    this.state = {user: "", pass: "", email: ""};

    this.subscriptionUser = null;
  }

  // obs para inserir usuer.
  getObsInsertUser() {
    const obs = {
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Done!");
      }
    }
    return obs;
  }

   // Entrada do usuário
   inputUser(e) {
    this.setState({user: e.target.value});
  }

  inputPass(e) {
    this.setState({pass: e.target.value});
  }

  inputEmail(e) {
    this.setState({email: e.target.value});
  }

  // Submit o formulário.
  submit(event) {
    console.log("Form submit");
    apiServices.insertUser({user: this.state.user, pass: this.state.pass, email: this.state.email}).subscribe(this.getObsInsertUser());
    event.preventDefault(); // Impede de submeter o formulário.
  }

  render() {
    return (
      <div className="register">
        <div className="entrada-register">
        
          <div className="icone-register">
            <img src={registerSVG}/>
          </div>

          <form onSubmit={this.submit.bind(this)}>
            
            <div id="input-register">
              <Input placeholder='Usuário' required type="text" icon='users' value={this.state.user} iconPosition='left' fluid
              onChange={this.inputUser.bind(this)} />
            </div>

            <div id="input-register">
              <Input placeholder='Senha' required type="text" icon='lock' value={this.state.pass} iconPosition='left' fluid
              onChange={this.inputPass.bind(this)} />
            </div>

            <div id="input-register">
              <Input placeholder='Email' required type="email" icon='mail' value={this.state.email} iconPosition='left' fluid
              onChange={this.inputEmail.bind(this)} />
            </div>

            <p id="erro-register">Mensagem de erro</p>

            <div className="botao-register">
              <Button color="black" type="submit" value="Submit" icon labelPosition='left'
                disabled={this.state.user.length === 0|| this.state.pass.length === 0|| this.state.email.length === 0 ? true : false} >
                <Icon name="add user"/>
                Cadastrar
              </Button>
           </div>

          </form>

        </div>

        <div className="go-cadastrar">
            <Link to="/auth/login">Já possui uma conta? Faça login.</Link>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
