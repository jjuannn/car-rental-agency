class Client{
    constructor({
        id, name, surname, doc_type, doc_num, address, phone, e_mail, birthdate
    }){
        this.id = id
        this.name = name
        this.surname = surname
        this.doc_type = doc_type
        this.doc_num = doc_num
        this.address = address
        this.phone = phone
        this.e_mail = e_mail
        this.birthdate = birthdate
    }
}
module.exports = { Client }