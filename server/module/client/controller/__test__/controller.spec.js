import exp from 'constants';
import Client from '../../entity/client';
import NoResultsError from '../../repository/error/noResultsError';
import ClientController from '../clientController';
import UndefinedIdError from '../error/undefinedId';

const serviceMock = {
  getAll: jest.fn(() => Promise.resolve()),
  saveNewClient: jest.fn(() => Promise.resolve()),
  saveEditedClient: jest.fn(() => Promise.resolve()),
  getById: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve())
};

const controller = new ClientController(serviceMock);

test('configureRoutes call app methods', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn()
  };

  controller.configureRoutes(app);

  expect(app.get).toHaveBeenCalledTimes(3);
  expect(app.post).toHaveBeenCalledTimes(2);
});

test('getAll calls repository correctly', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  await controller.getAll({}, resMock);

  expect(serviceMock.getAll).toHaveBeenCalledTimes(1);
});

test('an error exists in getAll if there is no results', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  serviceMock.getAll.mockImplementationOnce(() => Promise.resolve(new NoResultsError()));

  try {
    await controller.getAll({}, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
});

test('getById calls service correctly', async () => {
  const reqMock = {query: {id: 1}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  await controller.getById(reqMock, resMock);

  expect(serviceMock.getById).toHaveBeenCalledTimes(1);
  expect(serviceMock.getById).toHaveBeenCalledWith(reqMock.query.id);
});

test('geyById fails if there is no id', async () => {
  const reqMock = {query: {}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  try {
    await controller.getById(reqMock, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(UndefinedIdError);
    expect(serviceMock.getById).toHaveBeenCalledTimes(0);
  }
});

test('saveNewClient calls service correctly ', async () => {
  const reqMock = {body: {}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  await controller.saveNewClient(reqMock, resMock);

  expect(serviceMock.saveNewClient).toHaveBeenCalledTimes(1);
});

test('saveEditedClient calls service correctly', async () => {
  const reqMock = {query: {}, body: {id: 1}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  await controller.saveEditedClient(reqMock, resMock);

  expect(serviceMock.saveEditedClient).toHaveBeenCalledTimes(1);
});

test('delete fails if there is no id', async () => {
  const reqMock = {query: {}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  try {
    await controller.delete(reqMock, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(UndefinedIdError);
    expect(serviceMock.delete).toHaveBeenCalledTimes(0);
  }
});

test('delete calls repository correctly', async () => {
  const reqMock = {query: {id: 1}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  await controller.delete(reqMock, resMock);

  expect(serviceMock.delete).toHaveBeenCalledTimes(1);
});
