import React, { Component } from 'react';
import './navbar.css'
// import { Input } from 'semantic-ui-react';

import NavbarDesktopComponent from './navDesktop/navDesktop'
import NavbarMobileComponent from './navMobile/navMobile'
import * as userActions from './../../../../redux/actions/userActions';
import { connect } from 'react-redux';


class NavbarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {larguraTela: window.innerWidth};
    //console.log(this.props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.getInnerWidth.bind(this));
 }

  // Determina a largura da tela e renderiza a navbar correta.
  getInnerWidth() {
    this.setState({larguraTela: window.innerWidth});
  }

  // Navega para alguma rota.
  navigateTo(rota) {

    if(rota === "home")
      this.props.history.push('/agenda/home');
      
    else if (rota === "add")
      this.props.history.push('/agenda/add');

    else if (rota === "conta")
      this.props.history.push('/agenda/conta');

    else if (rota === "sair") {
      this.props.removeUser();
      this.props.history.push('/auth/login');
    }
  }

  render() {
    const nav = this.state.larguraTela >= 612 ? <NavbarDesktopComponent navbarProps={this.props.history} navigateTo={this.navigateTo.bind(this)}/> 
    : <NavbarMobileComponent navbarProps={this.props.history} navigateTo={this.navigateTo.bind(this)}/>
    return (
        <div>
          {nav}
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
    removeUser: () => {
      dispatch(userActions.removeUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
