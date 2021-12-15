import Client from '../entity/client';
import {ClientModel} from '../module';

export function formToEntity(client: Client): Client {
  const {id, name, surname, doc_type, doc_num, address, phone, e_mail, nationality, birthdate} =
    client;

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

export function dbToEntity(clientModel: typeof ClientModel): Client {
  const {id, name, surname, doc_type, doc_num, address, phone, e_mail, nationality, birthdate} =
    clientModel.toJSON();
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
