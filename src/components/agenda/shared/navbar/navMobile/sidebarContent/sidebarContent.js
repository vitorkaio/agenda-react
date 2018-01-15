import React, { Component } from 'react';
import './sidebarContent.css'
import { Icon, Divider } from 'semantic-ui-react';

class SidebarContentComponent extends Component {

  constructor(props) {
    super(props);
    const urlAtual = this.props.navMobile.location.pathname.split("/").pop();
    this.itemAtivado = urlAtual;
  }

  ativaItem(event) {
    this.itemAtivado = event.target.id;

    this.props.fechaSideBar();

    if(this.itemAtivado === "home")
      this.props.navMobile.push('/agenda/home');
      
    else if (this.itemAtivado === "add")
      this.props.navMobile.push('/agenda/add');

    else if (this.itemAtivado === "info")
      this.props.navMobile.push('/auth/register');

    else if (this.itemAtivado === "sair")
      this.props.navMobile.push('/auth/login');
  }

  render() {

    const rotaAtual = this.props.navMobile.location.pathname.split("/").pop();
    this.itemAtivado = rotaAtual === this.itemAtivado ? this.itemAtivado : rotaAtual;

    return (
      <div className="conteudoSideBar">
       
      <div className={this.itemAtivado === "home" ? "marcadoMobile" : null}
         onClick={this.ativaItem.bind(this)}>
          <Icon name="home"/>
          <span id="home">Home</span>
        </div>

        <div className={this.itemAtivado === "add" ? "marcadoMobile" : null}
         onClick={this.ativaItem.bind(this)}>
          <Icon name="add"/>
          <span id="add">Adicionar</span>
        </div>

        <div className={this.itemAtivado === "info" ? "marcadoMobile" : null}
         onClick={this.ativaItem.bind(this)}>
          <Icon name="info"/>
          <span id="info">Info</span>
        </div>

        <Divider />

        <div className={this.itemAtivado === "sair" ? "marcadoMobile" : null}
         onClick={this.ativaItem.bind(this)}>
          <Icon name="log out"/>
          <span id="sair">Sair</span>
        </div>

    </div>
    );
  }
}

export default SidebarContentComponent;
