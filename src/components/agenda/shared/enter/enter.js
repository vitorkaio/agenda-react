import React, { Component } from 'react';
import './enter.css';
import { Input } from 'semantic-ui-react';

class EnterComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ""};
  }

  inputData(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value}, () => {
      this.props.data(this.state.value);
    });
  }

  render() {
    return (
        <Input placeholder={this.props.placeholder}  type={this.props.type} icon={this.props.icon} 
         value={this.state.value} iconPosition='left' onChange={this.inputData.bind(this)} />
    );
  }
}

export default EnterComponent;
