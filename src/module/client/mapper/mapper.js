const { Client } = require("../entity/client")

function formToEntity(client){
    const {
        id,
        name,
        surname,
        doc_type,
        doc_num,
        address,
        phone,
        e_mail,
        birthdate
    } = client
 
    return new Client({
        id : Number(id),
        name,
        surname,
        doc_type,
        doc_num,
        address,
        phone,
        e_mail,
        birthdate
    })
}

function dbToEntity(model){
    return new Client(model.toJSON())
}

module.exports = { formToEntity, dbToEntity }

