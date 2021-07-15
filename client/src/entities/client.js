export default class Client {
  constructor({
    address,
    birthdate,
    doc_num,
    doc_type,
    e_mail,
    id,
    name,
    surname,
    nationality,
    phone
  }) {
    this.address = address;
    this.birthdate = birthdate;
    this.doc_num = doc_num;
    this.doc_type = doc_type;
    this.e_mail = e_mail;
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.nationality = nationality;
    this.phone = phone;
  }
}
