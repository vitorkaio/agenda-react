export default class User {
  
  constructor(id, user, pass, email) {
    this.id = id;
    this.user = user;
    this.pass = pass;
    this.email = email;
  }

  toObj() {
    return {
      id: this.id,
      user: this.user,
      pass: this.pass,
      email: this.email
    };
  }

}