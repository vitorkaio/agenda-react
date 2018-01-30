import axios from 'axios';
import { Observable } from 'rxjs/Observable'
import FirebaseService from './firebase/firebase';


const fireUser = FirebaseService.database().ref().child('users');

// Acess api services.
class ApiService {

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

  // Verifica se um usuário está cadastrado no sistema.
  static isRegister(user) {
    return Observable.create(obs => {
      fireUser.orderByChild("user").equalTo(user).on("value", snap => {
        if(snap.val() === null)
          obs.next(true);
        else
          obs.error(false)

        obs.complete();
      });
      
    });
  }

  // Delete one contact
  static deleteUser(user_id) {
    return Observable.create(obs => {
      const fireUserContacts = FirebaseService.database().ref().child(`users/${user_id}`);
      fireUserContacts.remove().then(res => {
        obs.next(true);
        obs.complete();
      }).catch(err => {
        obs.error(false);
      })
    });
  }

  // Return all contacts of the mongodb
  static getAllContacts(user_id) {
    return Observable.create(obs => {
      const fireUserContacts = FirebaseService.database().ref().child(`users/${user_id}/contacts`);
      fireUserContacts.orderByChild("name").on('value', snap => {
        snap.forEach(item => {
          obs.next(item);
        })
        obs.complete();
      },(errorObject) => {
        obs.error(false);
      });
    });
  }

  // Insere um contato no firebase.
  static insertContact(user_id, contact) {
    // console.log(contact);
    return Observable.create(obs => {
      const fireUserContacts = FirebaseService.database().ref().child(`users/${user_id}/contacts`);
      fireUserContacts.push(contact, erro => {
        if(erro === false)
          obs.error(false);
      });
      obs.next(true);
      obs.complete();
    });
  }

   // Update contact
   static updateContact(user_id, contact) {
    return Observable.create(obs => {
      const fireUserContacts = FirebaseService.database().ref().child(`users/${user_id}/contacts/${contact._id}`);
      fireUserContacts.update(contact, erro => {
        if(erro === false)
          obs.error(false);
        else {
          obs.next(true);
          obs.complete();
        }
      });
    });
  }

   // Delete one contact
   static deleteContact(user_id, contato) {
    return Observable.create(obs => {
      const fireUserContacts = FirebaseService.database().ref().child(`users/${user_id}/contacts/${contato._id}`);
      fireUserContacts.remove().then(res => {
        obs.next(true);
        obs.complete();
      }).catch(err => {
        obs.error(false);
      })
    });
  }

}// end class

export default ApiService