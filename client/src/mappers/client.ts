import Client from '../entities/client';

export default function apiToEntity({
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
}: Client): Client {
  return new Client(
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
  );
}
