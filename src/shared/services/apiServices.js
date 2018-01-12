import axios from 'axios';
import { Observable } from 'rxjs/Observable'

const contatcsUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/contatos'

// Acess api services.
class ApiService {

  // Return all contacts of the mongodb
  static getAllContacts() {
    return Observable.create(obs => {
      axios.get(contatcsUrl).then(res => {
        obs.next(res.data);
        obs.complete();
      })
      .catch(err => {
        obs.error(err);
      })
    });
  }

  // Get andress with CEP.
  static consultaCEP(numero) {
    return Observable.create(obs => {
      
      let cep = numero.replace(/\D/g, '');
    
      if (cep !== "") {
        let validacep = /^[0-9]{8}$/; //Expressão regular para validar o CEP.
  
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
          let url = 'https://viacep.com.br/ws/'+ cep + '/json';
          axios.get(url).then(res => {
            obs.next(res);
            obs.complete();
          })
          .catch(err => {
            obs.error(false);
          });
  
        }
        else {
            obs.error(false);
        }
      } 
      else {
        obs.error(false);
      }
    });
  }

}// end class

export default ApiService