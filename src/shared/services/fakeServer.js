// Fake server to testing redux and app.

class FakeServer {

  constructor() {
    this.list = [1,2,3];
    console.log('Fake server criado!');
  }

  pushContact(contact) {
    this.list.push(contact);
  }

  removeContact(nome) {
    for(let cont = 0; cont < this.list.length; cont++) {
      if(this.list[cont].getName() === nome) {
        this.list.splice(cont, 1);
        return true;
      }
    }
    return false;
  }

  getList() {
    return this.list.slice();
  }

}// end class

export default FakeServer