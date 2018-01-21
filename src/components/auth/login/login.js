import React, { Component } from 'react';
import './login.css';
import { Input, Button, Icon } from 'semantic-ui-react';
import loginSVG from './../../../assets/auth/login.svg';
import { Link } from 'react-router-dom'
import ApiService from './../../../shared/services/apiServices';

class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {user: "", pass: ""};

    this.subscriptionUser = null;

  }

  // Obs para logar o usuário.
  getObsLogin() {
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

  goCadastrar() {
    // Navega para outra rota.
    this.props.history.push("/auth/cadastrar");
  }

  goHome() {
    this.props.history.push("/agenda/home");
  }

  // Entrada do usuário
  inputUser(e) {
    this.setState({user: e.target.value});
  }

  inputPass(e) {
    this.setState({pass: e.target.value});
  }

  // Submit o formulário.
  submit(event) {
    this.subscriptionUser = ApiService.getUser(this.state.user, this.state.pass).subscribe(this.getObsLogin());
    event.preventDefault(); // Impede de submeter o formulário.
  }

  render() {
    return (
      <div className="login">
        <div className="entrada-login">
        
          <div className="icone-login">
            <img src={loginSVG}/>
          </div>

          <form onSubmit={this.submit.bind(this)}>
            
            <div id="input-login">
              <Input placeholder='Usuário'  type="text" icon='users' value={this.state.user} iconPosition='left' fluid
              onChange={this.inputUser.bind(this)} />
            </div>

            <div id="input-login">
              <Input placeholder='Senha'  type="text" icon='lock' value={this.state.pass} iconPosition='left' fluid
              onChange={this.inputPass.bind(this)} />
            </div>

            <p id="erro-login">Mensagem de erro</p>

            <div className="botao-login">
              <Button color="black" type="submit" value="Submit" icon labelPosition='left'
                disabled={false}>
                <Icon name="sign in"/>
                Login
              </Button>
           </div>

          </form>

        </div>

        <div className="go-cadastrar">
            <Link to="/auth/register">Cadastrar um novo usuário.</Link>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
