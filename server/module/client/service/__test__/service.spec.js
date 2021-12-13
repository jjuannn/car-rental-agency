import exp from 'constants';
import ClientService from '../clientService';
import InvalidClientError from '../error/invalidClient';
import InvalidIdError from '../error/invalidId';

const repositoryMock = {
  getById: jest.fn(() => Promise.resolve()),
  getAll: jest.fn(() => Promise.resolve()),
  saveEditedClient: jest.fn(() => Promise.resolve()),
  saveNewClient: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve())
};

const service = new ClientService(repositoryMock);

test('getById fails if the id is undefined', async () => {
  try {
    await service.getById();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidIdError);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(0);
  }
});

test('getById calls repository correctly', async () => {
  await service.getById(1);
  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
  expect(repositoryMock.getById).toHaveBeenCalledWith(1);
});

test('delete fails if the id is undefined', async () => {
  try {
    await service.delete();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidIdError);
    expect(repositoryMock.delete).toHaveBeenCalledTimes(0);
  }
});

test('delete calls repository correctly', async () => {
  await service.delete(1);
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(repositoryMock.delete).toHaveBeenCalledWith(1);
});

test('getAll calls repository correctly', async () => {
  await service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});

test('saveEditedClient fails if the client is undefined', async () => {
  try {
    await service.saveEditedClient();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidClientError);
    expect(repositoryMock.saveEditedClient).toHaveBeenCalledTimes(0);
  }
});

test('saveEditedClient calls repository correctly', async () => {
  const client = {};

  await service.saveEditedClient(client);

  expect(repositoryMock.saveEditedClient).toHaveBeenCalledTimes(1);
  expect(repositoryMock.saveEditedClient).toHaveBeenCalledWith(client);
});

test('saveNewClient fails if the client is undefined', async () => {
  try {
    await service.saveNewClient();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidClientError);
    expect(repositoryMock.saveNewClient).toHaveBeenCalledTimes(0);
  }
});

test('saveNewClient calls repository correctly', async () => {
  const client = {};

  await service.saveNewClient(client);

  expect(repositoryMock.saveNewClient).toHaveBeenCalledTimes(1);
  expect(repositoryMock.saveNewClient).toHaveBeenCalledWith(client);
});
