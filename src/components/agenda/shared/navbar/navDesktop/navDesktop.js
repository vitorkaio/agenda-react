import React, { Component } from 'react';
import './navDesktop.css'
// import { Icon } from 'semantic-ui-react';
import logo from './../../../../../assets/logo/logo.svg'

// import { Link } from 'react-router-dom'

class NavbarDesktopComponent extends Component {

  constructor(props) {
    super(props);

    const urlAtual = this.props.navbarProps.location.pathname.split("/").pop();
    this.itemAtivado = urlAtual;
    //console.log('NavbarDesktopComponent');
    //console.log(this.props.userReducer.user);
  }

  ativaItem(event) {
    /*this.setState({itemAtivado: event.target.id}, () => {
      this.props.navigateTo(this.state.itemAtivado);
    })*/
    this.itemAtivado = event.target.id;
    this.props.navigateTo(this.itemAtivado);
  }

  /*componentDidUpdate() {
    this.setState({activeItem: this.props.navbarProps.rotaProps.location.pathname.split("/").pop()});
  }*/

  render() {
    // console.log('NavbarDesktopComponent - Renderizado');
    const rotaAtual = this.props.navbarProps.location.pathname.split("/").pop();
    this.itemAtivado = rotaAtual === this.itemAtivado ? this.itemAtivado : rotaAtual;

    return (
      <nav className="navs">
        <div className="rotas">

          <div id="home" className={this.itemAtivado === "home" ? "marcado" : "hovs"}
          onClick={this.ativaItem.bind(this)} icon="home">Home</div>
          
          <div id="add" className={this.itemAtivado === "add" ? "marcado hovs" : "hovs"}
          onClick={this.ativaItem.bind(this)}>Adicionar</div>

        </div>

        <div className="icone"><img src={logo} width="50" height="40" alt="icone"/></div>

        <div className="ops">

          <div id="conta" className={this.itemAtivado === "conta" ? "marcado hovs" : "hovs"}
          onClick={this.ativaItem.bind(this)}>Conta</div>


          <div id="sair" className={this.itemAtivado === "sair" ? "marcado hovs" : "hovs"}
          onClick={this.ativaItem.bind(this)}>Sair</div>

        </div>
    </nav>
    );
  }
}

export default NavbarDesktopComponent;
