/// <reference types="@types/jest" />

import RentalController from '../rentalController';
import UndefinedIdError from '../error/undefinedId';
import NoResultsError from '../../repository/error/noResultsError';

const serviceMock = {
  saveNewRental: jest.fn(() => Promise.resolve()),
  saveEditedRental: jest.fn(() => Promise.resolve()),
  getById: jest.fn(() => Promise.resolve()),
  finish: jest.fn(() => Promise.resolve()),
  getAll: jest.fn(() => Promise.resolve())
};

const controller = new RentalController(serviceMock, {}, {});

test('configureRoutes calls app methods', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn()
  };

  controller.configureRoutes(app);

  expect(app.get).toHaveBeenCalledTimes(3);
  expect(app.post).toHaveBeenCalledTimes(2);
});

test('finish fails if the id is undefined', async () => {
  const resMock = {
    send: jest.fn(),
    status: function () {
      return this;
    }
  };

  try {
    await controller.finish({query: {}}, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(UndefinedIdError);
    expect(serviceMock.getById).toHaveBeenCalledTimes(0);
    expect(serviceMock.finish).toHaveBeenCalledTimes(0);
  }
});

test('getAll calls service correctly', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  await controller.getAll({}, resMock);

  expect(serviceMock.getAll).toHaveBeenCalledTimes(1);
});

test('getAll returns an error if the service fails', async () => {
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

test('getById fails if the id is undefined', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  const reqMock = {query: {}};

  try {
    await controller.getById(reqMock, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(UndefinedIdError);
    expect(serviceMock.getById).toHaveBeenCalledTimes(0);
  }
});

test('getById calls service correctly', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  const reqMock = {query: {id: 1}};

  await controller.getById(reqMock, resMock);

  expect(serviceMock.getById).toHaveBeenCalledTimes(1);
  expect(serviceMock.getById).toHaveBeenCalledWith(reqMock.query.id);
});
test('finish calls service correctly', async () => {
  const resMock = {
    send: jest.fn(),
    status: function () {
      return this;
    }
  };

  const req = {query: {id: 1}};

  await controller.finish(req, resMock);

  expect(serviceMock.getById).toHaveBeenCalledWith(req.query.id);
  expect(serviceMock.getById).toHaveBeenCalled();
  expect(serviceMock.finish).toHaveBeenCalled();
});

test('saveNewRental calls service correctly', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  const reqMock = {body: {}};

  await controller.saveNewRental(reqMock, resMock);

  expect(serviceMock.saveNewRental).toHaveBeenCalledTimes(1);
});

test('saveEditedRental fails if the id is undefined', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  const req = {query: {}, body: {}};
  try {
    await controller.saveEditedRental(req, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(UndefinedIdError);
    expect(serviceMock.saveEditedRental).toHaveBeenCalledTimes(0);
  }
});

test('saveEditedRental calls service correctly', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  const req = {query: {id: 1}, body: {}};

  await controller.saveEditedRental(req, resMock);

  expect(serviceMock.saveEditedRental).toHaveBeenCalledTimes(1);
});
