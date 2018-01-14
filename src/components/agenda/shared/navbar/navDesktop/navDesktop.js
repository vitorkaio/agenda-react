import React, { Component } from 'react';
import './navDesktop.css'
//import { Menu, Button } from 'semantic-ui-react';
import logo from './../../../../../logo.svg';

// import { Link } from 'react-router-dom'

class NavbarDesktopComponent extends Component {

  constructor(props) {
    super(props);

    const urlAtual = this.props.navbarProps.rotaProps.location.pathname.split("/").pop();
    //this.state = {activeItem: urlAtual};
    this.itemAtivado = urlAtual;
    //console.log('NavbarDesktopComponent');
    //console.log(this.props.userReducer.user);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  ativaItem(event) {
    this.itemAtivado = event.target.id
      if(this.itemAtivado === "home")
        this.props.navbarProps.rotaProps.push('/agenda/home');
      
      else if (this.itemAtivado === "add")
        this.props.navbarProps.rotaProps.push('/agenda/add');

      else if (this.itemAtivado === "info")
        this.props.navbarProps.rotaProps.push('/auth/register');

      else if (this.itemAtivado === "sair")
        this.props.navbarProps.rotaProps.push('/auth/login');
        
   
  }

  /*componentDidUpdate() {
    this.setState({activeItem: this.props.navbarProps.rotaProps.location.pathname.split("/").pop()});
  }*/

  render() {
    console.log('NavbarDesktopComponent - Renderizado');
    const rotaAtual = this.props.navbarProps.rotaProps.location.pathname.split("/").pop();
    this.itemAtivado = rotaAtual === this.itemAtivado ? this.itemAtivado : rotaAtual;

    return (
      <nav className="navs">
        <div className="rotas">

          <div id="home" className={this.itemAtivado === "home" ? "marcado" : null}
          onClick={this.ativaItem.bind(this)}>Home</div>
          
          <div id="add" className={this.itemAtivado === "add" ? "marcado" : null}
          onClick={this.ativaItem.bind(this)}>Adicionar</div>

        </div>

        <div className="icone"><img src={logo} width="50" height="50" alt="icone"/></div>

        <div className="ops">

          <div id="info" className={this.itemAtivado === "info" ? "marcado" : null}
          onClick={this.ativaItem.bind(this)}>Info</div>


          <div id="sair" className={this.itemAtivado === "sair" ? "marcado" : null}
          onClick={this.ativaItem.bind(this)}>Sair</div>

        </div>
    </nav>
    );
  }
}

export default NavbarDesktopComponent;