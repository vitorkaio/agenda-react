import React, { Component } from 'react';
import './home.css';
import ApiService from './../../../shared/services/apiServices'
import ListarComponent from './listar/listar'
import { Icon, Input } from 'semantic-ui-react';
import { connect } from 'react-redux'
import * as contactActions from './../../../redux/actions/contactActions'
import InfoComponent from './info/info'


class HomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {update: false, pesquisa: "", openInfo: false};

    this.lista = [];
    this.auxLista = [];
    this.contato = null;

    this.subscription = null;
    this.erroServidor = false;

    this.subscriptionDeleteItem = null // subscribe para deletar um contato.

    // Se houver algum contato no reducer remove para não dá problema na adição/change.
    if(this.props.contactReducer !== undefined)
      this.props.removeContact();
    
  }

  // É chamado antes do componente ser renderizado.
  componentWillMount() {
    this.getContatos();
  }

   getContatos() {
    this.subscription = ApiService.getAllContacts().subscribe(this.getObsFunctions()); // Pegando os contatos da api.
  }

  // After component will be destroyed.
  //componentWillUnmount() {}

  // Retorna as funções que o Obeservable irá utilizar para pegar os contatos.
  getObsFunctions() {
    let obs = {
        next: (next) => {
          this.auxLista = [];
          next.forEach(element => {
          //console.log(element['_id'], element['nome']);
          this.auxLista.push(element);
        });
      },
      error: (err) => {
        console.log(err);
        this.erroServidor = false;
      },
      complete: () => {
        this.erroServidor = true;
        setTimeout(() => {
          this.setState({update: false});
        }, 800);

        this.subscription.unsubscribe(); // Unsubscribe of a observable.
      }
    }
    return obs;
  }

   // Obs para deletar um contato.
   getObsDeleteItem() {
    let obs = {
        next: (next) => {
          if(next === true){
           console.log("Contato deletado");
          }
          else
            console.log("Não foi possível deletar o contato");
      },
      error: (err) => {
        console.log("Não foi possível deletar", err);
      },
      complete: () => {
        console.log("done delete!");
        this.getContatos();
        this.subscriptionDeleteItem.unsubscribe();
      }
    }
    return obs;
  }

  // Pesquisa e filtra o array.
  pesquisaFiltraContatos(event) {
    const entrada = event.target.value;
    this.lista = [];

    for(let contato of this.auxLista) {
      if(!isNaN(parseFloat(entrada)) && isFinite(entrada) === true) {
        if(contato.tel.toString().indexOf(entrada) !== -1)  
          this.lista.push(contato);
      }  

      else if(contato.name.toLocaleLowerCase().indexOf(entrada) !== -1)
        this.lista.push(contato);
    }

    console.log(entrada, this.lista);
    this.setState({pesquisa: entrada});
  }

  // Deleta um contato.
  deletaContato(contato) {
    this.subscriptionDeleteItem = ApiService.deleteContact(contato._id).subscribe(this.getObsDeleteItem());
  }

  // Altera um Contato.
  alteraContato(contato) {
    this.props.insereContatct(contato);
    this.props.history.push('/agenda/add');
  }

  // Abre uma tela de info do contato.
  info(contato) {
    this.contato = contato;
    this.setState({openInfo: !this.state.openInfo})
  }

   // Renderiza a lista no listComponent.
   renderizaLista() {
    if(this.erroServidor === false)
      return (<div> <Icon loading name='spinner' size="huge"/> </div>);
    
    this.lista = this.state.pesquisa.length === 0 ? this.auxLista.slice() : this.lista.slice();
    return (
     <ListarComponent itens={this.lista} deletaContato={this.deletaContato.bind(this)} alteraContato={this.alteraContato.bind(this)} 
      info={this.info.bind(this)}/>
    );
  }

  render() {
    console.log('HomeComponente - Rendenrizado');
    const saida = this.renderizaLista(); // Renderiza a lista se ela existir.
    const loadSpinner = this.auxLista.length; // Se a lista tiver vazia, mostra um spinner de load.
    return (
       <div>
        {this.state.openInfo ? <InfoComponent contatoInfo={this.contato} fechaInfo={this.info.bind(this)}/> : 
          <div className={loadSpinner === 0 ? "loadSpiner" : "listagem"}>
            {loadSpinner === 0 ? null : <Input className="pesquisa" loading icon='user' placeholder='Pesquisar...' 
            onChange={this.pesquisaFiltraContatos.bind(this)} />}
            {saida}
          </div>}
       </div>
    );
  }
}

// *************************************** Connect Redux ***************************************


const mapStateToProps = (state) => {
  return {
    contactReducer: state.contactReducer.contact
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    insereContatct: (contact) => {
      dispatch(contactActions.insertContact(contact))
    },
    removeContact: () => {
      dispatch(contactActions.removeContact())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
