// Class for abstraction of propertys of a Contact person.
class Contact {
  
  constructor(name, tel, email, andress, description) {
    this.name = name;
    this.tel = tel;
    this.email = email;
    this.andress = andress;
    this.description = description;
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
    return `\nName: ${this.name}\nTel: ${this.tel}\nEmail: ${this.email}\Andress: ${this.andress}\Description: ${this.description}`;
  }

}// Fim da classe

export default Contact;