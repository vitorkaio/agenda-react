import React, { Component } from 'react';
import './navMobile.css'
import { Icon } from 'semantic-ui-react';
import logo from './../../../../../assets/logo/logo.svg';
import Sidebar from 'react-sidebar';
import SidebarContentComponent from './sidebarContent/sidebarContent';

class NavbarMobileComponent extends Component {

  constructor(props) {
    super(props);

    this.state = { sidebarOpen: false};
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

    this.urlAtual = this.props.navbarProps.rotaProps.location.pathname.split("/").pop();
    this.route = this.props.navbarProps.rotaProps;

    this.titulo = "";
  }

  // Abre a sideBar deslizando os dedos.
  onSetSidebarOpen(ops) {
    this.setState({sidebarOpen: ops});
  }

  // Abre ou fecha a sideBar ao clicar no menu.
  abreSidebar() {
    this.setState({sidebarOpen: !this.state.sidebarOpen})
  }

  // Atualiza o nome da rota atual.
  getRotaAtual() {
    const rota = this.props.navbarProps.rotaProps.location.pathname.split("/").pop();

    if(rota === "home")
      this.titulo = "Home";
    
    else if(rota === "add")
      this.titulo = "Adicionar";

    else if(rota === "info")
      this.titulo = "Info";
    
    else if(rota === "sair")
      this.titulo = "Sair";

  }

  render() {
    this.getRotaAtual();
    
    return (
        <div className="navsMobile">
          <div>
          <Sidebar contentClassName="sidebarMobile" shadow={false}
            sidebar={<SidebarContentComponent navMobile={this.route} fechaSideBar={this.abreSidebar.bind(this)}/>} 
            sidebarClassName="sidebarContentMobile"
            rootClassName={this.state.sidebarOpen === true ? null : "root"}
            touch={false}
            transitions={this.state.sidebarOpen === false ? false : true}
            touchHandleWidth={10}
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}>
            <Icon name="sidebar" size='large' onClick={this.abreSidebar.bind(this)}/>
          </Sidebar>
          </div>
          <div className="pathMobile">{this.titulo}</div>
          <div><img src={logo} width="50" height="35" alt="icone"/></div>
        </div>
    );
  }
}

export default NavbarMobileComponent;
