import Client from '../entity/client';

export function formToEntity(client): Client {
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

  return new Client(
    Number(id),
    name,
    surname,
    doc_type,
    doc_num,
    address,
    phone,
    e_mail,
    nationality,
    birthdate
  );
}

export function dbToEntity(model): Client {
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
  } = model.toJSON();
  return new Client(
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
  );
}
