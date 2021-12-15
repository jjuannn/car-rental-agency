import Client from '../../entity/client';
import {dbToEntity, formToEntity} from '../mapper';

const body = {
  id: 1,
  name: 'john',
  surname: 'doe',
  doc_type: 'dni',
  doc_num: '55555555',
  address: 'street 123',
  phone: '4444444444',
  e_mail: 'johndoe@gmail.com',
  nationality: 'argentina',
  birthdate: '10-10-1999'
};

test('formToEntity returns a instance of Client', () => {
  const client = formToEntity(body);
  expect(client).toBeInstanceOf(Client);
});

const model = {
  toJSON: () => {
    return {
      id: 1,
      name: 'john',
      surname: 'doe',
      doc_type: 'dni',
      doc_num: '55555555',
      address: 'street 123',
      phone: '4444444444',
      e_mail: 'johndoe@gmail.com',
      nationality: 'argentina',
      birthdate: '10-10-1999'
    };
  }
};

test('dbToEntity returns a instance of Client', () => {
  const client = dbToEntity(model);
  expect(client).toBeInstanceOf(Client);
});
