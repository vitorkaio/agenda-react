import React, { Component } from 'react';
import './info.css'
import { Button, Divider, Icon, Popup } from 'semantic-ui-react';

class InfoComponent extends Component {

  constructor(props) {
    super(props);
    
  }

  fechaInfo() {
    this.props.fechaInfo(null);
  }

  // Deleta o contato.
  deleta() {
    this.props.deletaContato(this.props.contatoInfo);
    //this.fechaInfo(null);
  }

  // Altera o contato.
  alteraContato() {
    this.props.alteraContato(this.props.contatoInfo);
  }

  render() {
    return (
      <div className="tudo-contato">
        <div className="infos">
          <div className="mapa-contato"></div>
          <div className="info-contato">
            <div className="titulo-contato"><Icon name="users"/> {this.props.contatoInfo.name}</div>
            <div><Icon name="call"/> {this.props.contatoInfo.tel}</div>
            <div><Icon name="mail"/> {this.props.contatoInfo.email}</div>
            <div><hr/></div>
            <div><Icon name="location arrow"/> {this.props.contatoInfo.cep}</div>
            <div><Icon name="building"/> {this.props.contatoInfo.city}</div>
            <div><Icon name="map"/> {this.props.contatoInfo.state}</div>
            <div><Icon name="location arrow"/> {this.props.contatoInfo.andress}</div>
          </div>
        </div>
        <div className="comentario-contato"><Icon name="comments"/> {this.props.contatoInfo.description}</div>
        <div className="acoes-contato">

          <Popup
            trigger={
              <Button id="butoes-contato" color='black' icon onClick={this.fechaInfo.bind(this)}>
                <Icon name='left arrow' />
              </Button>
            }
            content='Voltar para o Home'
            inverted
            position='top center'
          />

          <Popup
            trigger={
              <Button id="butoes-contato" color='black' icon onClick={this.alteraContato.bind(this)}>
                <Icon name='edit' />
              </Button>
            }
            content='Editar o contato'
            inverted
            position='top center'
          />

          <Popup
            trigger={
              <Button id="butoes-contato" color='red' icon onClick={this.deleta.bind(this)}>
                <Icon name='delete' />
              </Button>
            }
            content='Deleta o contato'
            inverted
            position='top center'
          />

        </div>
      </div>
    );
  }
}

export default InfoComponent;