import React, { Component } from 'react';
import './modal.css'
import { Button, Modal } from 'semantic-ui-react';


class ModalComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {openModal: true};
  }

  acao(op) {
    if(op === 0) {
      this.setState({openModal: false}, () => {
        this.props.escolha(0);
      });
    }

    else {
      this.setState({openModal: false}, () => {
        this.props.escolha(1);
      });
    }
  }

  render() {
    console.log("Modal - render!");
    return (
      <div className="modals">
        <Modal size="mini" open={this.state.openModal}>
          <Modal.Content>
            <p>{this.props.msg}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => {this.acao(0)}}>
                Não
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Sim' onClick={() => { this.acao(1) }}/>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
