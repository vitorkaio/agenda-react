import React, { Component } from 'react';
import './register.css';
import { Link } from 'react-router-dom'
import { Input, Button, Icon } from 'semantic-ui-react';
import registerSVG from './../../../assets/auth/register.svg';
import ApiService from '../../../shared/services/apiServices';
import { connect } from 'react-redux';
import * as userActions from './../../../redux/actions/userActions';
import User from './../../../shared/models/user';

class RegisterComponent extends Component {

  constructor(props) {
    super(props)
    // console.log("RegisterComponent");
    this.state = {user: "", pass: "", email: "", loading: false};

    this.subscriptionInsertUser = null;
    this.subscriptionIsRegister = null;
    this.erro = "";
  }

  componentWillUnmount() {
    try {
      this.subscriptionUser.unsubscribe();
      
    } catch (error) {
      ;
    }
  }

  // obs para inserir usuer.
  getObsInsertUser() {
    const obs = {
      next: (res) => {
        let user = new User(res, this.state.user, this.state.pass, this.state.email);
        this.props.insertUser(user.toObj());
        this.navigateToHome();
        // console.log(user.toObj(), res);
      },
      error: (err) => {
        // console.log(err);
      },
      complete: () => {
        // console.log("Done!");
      }
    }
    return obs;
  }

   // obs para verificar se um usuário existe.
   getObsIsRegister() {
    const obs = {
      next: (res) => {
        if(res === true) {
          this.erro = "";
          this.subscriptionInsertUser = ApiService.insertUser({user: this.state.user, pass: this.state.pass, email: this.state.email}).subscribe(this.getObsInsertUser());
        }
      },
      error: (err) => {
        setTimeout(() => {
          if(err === false)
            this.erro = "Login já em uso, tente outro!";
          this.setState({loading: false});
        }, 2000);
      },
      complete: () => {
        setTimeout(() => {
          this.setState({loading: false});
          this.subscriptionIsRegister.unsubscribe();
        }, 2000);
      }
    }
    return obs;
  }

  // Navega para rota home.
  navigateToHome() {
    this.props.history.push("/agenda/home");
  }

   // Entrada do usuário
   inputUser(e) {
     this.erro = "";
    this.setState({user: e.target.value});
  }

  inputPass(e) {
    this.erro = "";
    this.setState({pass: e.target.value});
  }

  inputEmail(e) {
    this.erro = "";
    this.setState({email: e.target.value});
  }

  // Submit o formulário.
  submit(event) {
    this.setState({loading: true});
    this.subscriptionIsRegister = ApiService.isRegister(this.state.user).subscribe(this.getObsIsRegister());
    // apiServices.insertUser({user: this.state.user, pass: this.state.pass, email: this.state.email}).subscribe(this.getObsInsertUser());
    event.preventDefault(); // Impede de submeter o formulário.
  }

  render() {
    return (
      <div className="register">
        <div className="entrada-register">
        
          <div className="icone-register">
            <img src={registerSVG} alt="logo"/>
          </div>

          <form onSubmit={this.submit.bind(this)}>
            
            <div id="input-register">
              <Input placeholder='Usuário' required type="text" icon='users' value={this.state.user} iconPosition='left' fluid
              onChange={this.inputUser.bind(this)} />
            </div>

            <div id="input-register">
              <Input placeholder='Senha' required type="password" icon='lock' value={this.state.pass} iconPosition='left' fluid
              onChange={this.inputPass.bind(this)} />
            </div>

            <div id="input-register">
              <Input placeholder='Email' required type="email" icon='mail' value={this.state.email} iconPosition='left' fluid
              onChange={this.inputEmail.bind(this)} />
            </div>

            {this.erro.length === 0 ? <p id="erro-register"></p> : <p id="erro-login">{this.erro}</p>}

           {this.state.loading 
            ? 
            <div id="load-register"><Icon name="spinner" loading size="large" /></div>
            :
            <div className="botao-register">
              <Button color="black" type="submit" value="Submit" icon labelPosition='left'
                disabled={this.state.user.length === 0|| this.state.pass.length === 0|| this.state.email.length === 0 ? true : false} >
                <Icon name="add user"/>
                Cadastrar
              </Button>
            </div>
          }

          </form>

        </div>

        <div className="go-cadastrar">
            <Link to="/auth/login">Já possui uma conta? Faça login.</Link>
        </div>
      </div>
    );
  }
}// End component

const mapStateToProps = (state) => {
  return {
    userReducer: state.userReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    insertUser: (user) => {
      dispatch(userActions.insertUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);
