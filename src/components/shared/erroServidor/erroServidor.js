import React from 'react';
import './erroServidor.css'
import { Link } from 'react-router-dom'
import { Message, Button } from 'semantic-ui-react';

// Define as rotas para os componentes de autenticação.

const ErroServidorComponent = () => (
  <div className="erro-servidor">
    <Message className="msg-erro"
      icon='warning'
      header='Erro no servidor!'
      content={`Não foi possível executar a operação devido a um erro interno no servidor.`}
    />
    
    <div className="reseta-servidor">
      <Link to="/agenda">
        <Button color='black'>Voltar</Button>
      </Link>
    </div>
  </div>
);

export default ErroServidorComponent