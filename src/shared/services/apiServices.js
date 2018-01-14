import axios from 'axios';
import { Observable } from 'rxjs/Observable'
const contatcsUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/contatos';
const contatcsInsertUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/insere';
const contatcsDeletetUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/delete/';
const contatcsUpdateUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/update/';
// const user_id = '5a58199463898d1a10f584fd';

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

  // Insert contact
  static insertContact(contact) {
    console.log(contact);
    return Observable.create(obs => {
      axios.post(contatcsInsertUrl, contact).then(res => {
        console.log(res.data.status);
        if(res.data.status === true) {
          obs.next(true);
          obs.complete();
        }
        else {
          obs.next(false);
        }
      }).catch(err => {
        obs.error(false);
      });
    });
  }

    // Update contact
    static updateContact(contact) {
      console.log(contact);
      return Observable.create(obs => {
        axios.put(contatcsUpdateUrl + contact['_id'], contact).then(res => {
          console.log(res.data.status);
          if(res.data.status === true) {
            obs.next(true);
            obs.complete();
          }
          else {
            obs.next(false);
          }
        }).catch(err => {
          obs.error(false);
        });
      });
    }

  // Delete one contact
  static deleteContact(id) {
    return Observable.create(obs => {
      axios.delete(contatcsDeletetUrl + id).then(res => {
        if(res.data.status === true)
          obs.next(true);
        else
          obs.next(false);
        obs.complete();
      }).catch(err => {obs.error(err)});
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