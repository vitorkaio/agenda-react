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

    this.props.navTo(this.itemAtivado);
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

        <div className={this.itemAtivado === "conta" ? "marcadoMobile" : null}
         onClick={this.ativaItem.bind(this)}>
          <Icon name="info"/>
          <span id="conta">Conta</span>
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
