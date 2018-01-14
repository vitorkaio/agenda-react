import React, { Component } from 'react';
import './navDesktop.css'
import { Menu, Button } from 'semantic-ui-react';
import logo from './../../../../../logo.svg';

class NavbarDesktopComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {activeItem: 'home'};
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Menu className="navs">
      <Menu.Item className="icone">
        <img src={logo} />
      </Menu.Item>
      <Menu.Item name='home' 
       color={activeItem === 'home' ? "red" : "black"} active={activeItem === 'home'} 
       onClick={this.handleItemClick}>
        Home
      </Menu.Item>

      <Menu.Item name='add' 
       color={activeItem === 'add' ? "red" : "black"}
       active={activeItem === 'add'} onClick={this.handleItemClick}>
        Adicionar
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item name='info'  
         color={activeItem === 'info' ? "blue" : "black"}
         active={activeItem === 'info'} onClick={this.handleItemClick}>
         Info
        </Menu.Item>

        <Menu.Item name='sair'
        color={activeItem === 'sair' ? "blue" : "black"}
         active={activeItem === 'sair'} onClick={this.handleItemClick}>
         <Button primary>Sign up</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    );
  }
}

export default NavbarDesktopComponent;
