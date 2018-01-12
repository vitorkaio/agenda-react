// Class for abstraction of propertys of a Contact person.
class Contact {
  
  constructor(name, tel, email, andress, city, state, description) {
    this.id = '';
    this.name = name;
    this.tel = tel;
    this.email = email;
    this.city = city;
    this.state = state;
    this.andress = andress;
    this.description = description;
  }

  setId(id) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setTel(tel) {
    this.tel = tel;
  }

  getTel() {
    return this.tel;
  }

  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  setCity(city) {
    this.city = city;
  }

  getCity() {
    return this.city;
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  setAndress(andress) {
    this.andress = andress;
  }

  getAndress() {
    return this.andress;
  }

  setDescription(description) {
    this.description = description;
  }

  toString() {
    return `\nId: ${this.id}\nName: ${this.name}\nTel: ${this.tel}\nEmail: ${this.email}\nCity: ${this.city}\nState: ${this.state}\nAndress: ${this.andress}\nDescription: ${this.description}`;
  }

  toJson() {
    let objson = {
      'name': this.name,
      'tel': this.tel,
      'email': this.email,
      'city': this.city,
      'state': this.state,
      'andress': this.andress,
      'description': this.description
    }

    return JSON.stringify(objson);
  }

}// Fim da classe

export default Contact;