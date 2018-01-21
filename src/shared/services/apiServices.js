import axios from 'axios';
import { Observable } from 'rxjs/Observable'
import FirebaseService from './firebase/firebase';


const contatcsUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/contatos';
const contatcsInsertUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/insere';
const contatcsDeletetUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/delete/';
const contatcsUpdateUrl = 'http://localhost:8989/user/5a58199463898d1a10f584fd/update/';
// const user_id = '5a58199463898d1a10f584fd';

const fireUser = FirebaseService.database().ref().child('users');

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

  // Retorna todos os usuários do firebase. 'value' => retorna todos os dados do firebase.
  static getAllUser() {
    return Observable.create(obs => {
      fireUser.on('value', snap => {
        obs.next(snap.val());
        obs.complete();
      },(errorObject) => {
        obs.error(false);
      });
    });
  }

  // Cadastra um usuário no firebase.
  static insertUser(user) {
    return Observable.create(obs => {
      const key = fireUser.push(user, erro => {
        if(erro)
          obs.error(false);
      }).key;
      obs.next(key);
      obs.complete();
    });
  }

  static getUser(user, pass) {
    return Observable.create(obs => {
      let users = [];
      fireUser.orderByChild("user").equalTo(user).on("value", snap => {
        snap.forEach(data => {
          if(data.val().pass === pass)
            users.push(data);
        });
        if(users.length === 0)
          obs.error(false);
        else {
          obs.next(users[0])
          obs.complete();
        }
      });
      
    });
  }

}// end class

export default ApiService