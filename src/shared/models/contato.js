// Classe que abstrai as propriedades de um contato telefônico.
class Contato {
  
  constructor(nome, telefone, email, endereco, descricao) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.endereco = endereco;
    this.descricao = descricao;
  }

  setNome(nome) {
    this.nome = nome;
  }

  getNome() {
    return this.nome;
  }

  setTelefone(telefone) {
    this.telefone = telefone;
  }

  getTelefone() {
    return this.telefone;
  }

  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  setEndereco(endereco) {
    this.endereco = endereco;
  }

  getEndereco() {
    return this.endereco;
  }

  setDescricao(descricao) {
    this.descricao = descricao;
  }

  toString() {
    return `\nNome: ${this.nome}\nTelefone: ${this.telefone}\nEmail: ${this.email}\nEndereço: ${this.endereco}\nDescrição: ${this.descricao}`;
  }

}// Fim da classe

export default Contato;