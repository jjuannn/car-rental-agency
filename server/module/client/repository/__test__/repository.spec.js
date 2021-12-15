import {Sequelize} from 'sequelize';
import ClientModel from '../../model/clientModel';
import ClientRepository from '../postgres/clientRepository';
import Client from '../../entity/client';
import NoResultsError from '../error/noResultsError';

const sequelizeInstance = new Sequelize('sqlite::memory', {
  logging: false
});

let repository;
let clientModel;

beforeAll(() => {
  clientModel = ClientModel.setup(sequelizeInstance);
  repository = new ClientRepository(clientModel);
});

beforeEach(async () => {
  await sequelizeInstance.sync({force: true});
});

const clientToSave = new Client(
  1,
  'john',
  'doe',
  'dni',
  '55555555',
  'street 123',
  '4444444444',
  'johndoe@gmail.com',
  'argentina',
  '10-10-1999'
);

test('getAll throws an error is the list is empty', async () => {
  try {
    await repository.getAll();
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
});

test('getAll returns an array of clients ', async () => {
  const savedClient = await repository.saveNewClient(clientToSave);
  const clientsList = await repository.getAll();

  expect(clientsList.length).toEqual(1);
  expect(clientsList).toEqual([savedClient]);
});

test('saveNewClient returns the same client after saving it', async () => {
  const savedClient = await repository.saveNewClient(clientToSave);

  expect(savedClient.id).toEqual(clientToSave.id);
  expect(savedClient.id).toEqual(1);
});

test('saveEditedClient update a client correctly', async () => {
  const newClient = await repository.saveNewClient(clientToSave);
  expect(newClient.id).toEqual(1);

  const editedClient = {...newClient, name: 'jane'};
  const savedClient = await repository.saveEditedClient(editedClient);

  expect(savedClient.id).toEqual(newClient.id);
});

test('getById returns a client with a valid id', async () => {
  const newClient = await repository.saveNewClient(clientToSave);
  const client = await repository.getById(newClient.id);

  expect(client).toBeInstanceOf(Client);
});

test('getById fails if cannot find a client with the specified id', async () => {
  let client;
  try {
    client = await repository.getById(20);
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
});

test('delete returns true if deleted a client', async () => {
  const newClient = await repository.saveNewClient(clientToSave);
  const deleteClient = await repository.delete(newClient.id);
  expect(deleteClient).toBe(true);
});

test('delete fails if cannot find a client with the specified id', async () => {
  let client;
  try {
    await repository.delete(20);
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
  expect(client).toBeUndefined();
});
