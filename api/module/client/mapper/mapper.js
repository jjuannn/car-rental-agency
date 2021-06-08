const {Client} = require('../entity/client');

function formToEntity(client) {
  const {
    id,
    name,
    surname,
    doc_type,
    doc_num,
    address,
    phone,
    e_mail,
    nationality,
    birthdate
  } = client;

  return new Client({
    id: Number(id),
    name,
    surname,
    doc_type,
    doc_num,
    address,
    phone,
    e_mail,
    nationality,
    birthdate
  });
}

function dbToEntity(model) {
  return new Client(model.toJSON());
}

module.exports = {formToEntity, dbToEntity};
