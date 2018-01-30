import React, { Component } from 'react';
import './login.css';
import { Input, Button, Icon } from 'semantic-ui-react';
import loginSVG from './../../../assets/auth/login.svg';
import { Link } from 'react-router-dom'
import ApiService from './../../../shared/services/apiServices';
import { connect } from 'react-redux';
import * as userActions from './../../../redux/actions/userActions';
import User from './../../../shared/models/user';

class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {user: "", pass: "", loading: false};

    this.subscriptionUser = null;
    this.erro = "";

  }

  componentWillUnmount() {
    try {
      this.subscriptionUser.unsubscribe();
      
    } catch (error) {
      ;
    }
  }

  // Obs para logar o usuário.
  getObsLogin() {
    const obs = {
      next: (res) => {
        let user = new User(res.key, res.val().user, res.val().pass, res.val().email);
        this.props.insertUser(user.toObj());
        this.navigateToHome();
      },
      error: (err) => {
        // console.log(err);
        setTimeout(() => {
          this.erro = "Login inválido!";
          this.setState({loading: false});
        }, 2000);
      },
      complete: () => {
        this.erro = "";
        setTimeout(() => {
          this.setState({loading: false});
        }, 2000);
      }
    }
    return obs;
  }

  goCadastrar() {
    // Navega para outra rota.
    this.props.history.push("/auth/cadastrar");
  }

  navigateToHome() {
    this.props.history.push("/agenda/home");
  }

  // Entrada do usuário
  inputUser(e) {
    this.erro = "";
    this.setState({user: e.target.value});
  }

  // Entrada da senha do usuário.
  inputPass(e) {
    this.erro = "";
    this.setState({pass: e.target.value});
  }

  // Submit o formulário.
  submit(event) {
    this.setState({loading: true});
    this.subscriptionUser = ApiService.getUser(this.state.user, this.state.pass).subscribe(this.getObsLogin());
    event.preventDefault(); // Impede de submeter o formulário.
  }

  render() {
    return (
      <div className="login">
        <div className="entrada-login">
        
          <div className="icone-login">
            <img src={loginSVG} alt="logo"/>
          </div>

          <form onSubmit={this.submit.bind(this)}>
            
            <div id="input-login">
              <Input placeholder='Usuário'  type="text" icon='users' value={this.state.user} iconPosition='left' fluid
              onChange={this.inputUser.bind(this)} />
            </div>

            <div id="input-login">
              <Input placeholder='Senha'  type="password" icon='lock' value={this.state.pass} iconPosition='left' fluid
              onChange={this.inputPass.bind(this)} />
            </div>

            {this.erro.length === 0 ? <p id="erro-login"></p> : <p id="erro-login">{this.erro}</p>}

            {this.state.loading 
              ? 
              <div id="load-login"><Icon name="spinner" loading size="large" /></div>
              :
              <div className="botao-login">
                <Button color="black" type="submit" value="Submit" icon labelPosition='left'
                  disabled={this.state.user.length === 0 || this.state.pass.length === 0 ? true : false}>
                  <Icon name="sign in"/>
                  Login
                </Button>
            </div>
          }

          </form>

        </div>

        <div className="go-cadastrar">
            <Link to="/auth/register">Cadastrar um novo usuário.</Link>
        </div>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
