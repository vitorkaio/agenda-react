import React, { Component } from 'react';
import './conta.css'
import { Button, Icon } from 'semantic-ui-react';
import ApiServer from './../../../shared/services/apiServices';

class ContaComponent extends Component {

  constructor(props) {
    super(props);

    this.subs = null;
  }

  componentWillUnmount() {
    try {
      this.subs.unsubscribe();
    } catch (error) {
      ;
    }
  }

  getObs() {
    const obs = {
      next: (res) => {
        this.props.removeUser();
        this.props.history.push("auth/login");
      },
      error: (err) => {
        alert("Não foi possível deletar a conta!");
      },
      complete: () => {
        ;
      }
    }

    return obs;
  }

  // Deleta a conta do usuário.
  deletaConta() {
    const isDelete = window.confirm("Tem certeza que deseja deletar sua conta?");
    if(isDelete)
      this.subs = ApiServer.deleteUser(this.props.userReducer.id).subscribe(this.getObs());
  }


  render() {
    return (
      <div className="tudo-conta">
        <div className="info-conta">
          <p><Icon name="user"/> {this.props.userReducer.user}</p>
          <p><Icon name="mail"/> {this.props.userReducer.email}</p>
          <p><Icon name="code"/> {this.props.userReducer.id}</p>
        </div>
        
        <div id="info-acoes">
          <Button color="red" fluid icon onClick={this.deletaConta.bind(this)}> <Icon name="delete"/> Deletar </Button>
        </div>
      
      </div>
    );
  }
}

export default ContaComponent;