import React, { Component } from 'react';
import './navbar.css'
// import { Input } from 'semantic-ui-react';

import NavbarDesktopComponent from './navDesktop/navDesktop'
import NavbarMobileComponent from './navMobile/navMobile'

class NavbarComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {larguraTela: window.innerWidth};
    //console.log(this.props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.getInnerWidth.bind(this));
 }

  // Determina a largura da tela e renderiza a navbar correta.
  getInnerWidth() {
    this.setState({larguraTela: window.innerWidth});
  }

  render() {
    //console.log("Navbar - render");
    const nav = this.state.larguraTela >= 612 ? <NavbarDesktopComponent navbarProps={this.props}/> : <NavbarMobileComponent navbarProps={this.props}/>
    return (
        <div>
          {nav}
        </div>
    );
  }
}

export default NavbarComponent;
