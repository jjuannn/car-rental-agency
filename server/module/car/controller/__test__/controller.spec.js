import exp from 'constants';
import NoResultsError from '../../repository/error/noResultsError';
import CarController from '../carController';
import UndefinedIdError from '../error/undefinedId';

const CarServiceMock = {
  saveNewCar: jest.fn(() => Promise.resolve()),
  saveEditedCar: jest.fn(() => Promise.resolve()),
  getById: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
  getAll: jest.fn(() => Promise.resolve())
};

const multerMock = {
  single: jest.fn(() => {})
};

const controller = new CarController(multerMock, CarServiceMock);

test('configureRoutes calls app methods', async () => {
  const app = {
    get: jest.fn(),
    post: jest.fn()
  };
  controller.configureRoutes(app);

  expect(app.get).toHaveBeenCalledTimes(4);
  expect(app.post).toHaveBeenCalledTimes(2);
});

test('getAll calls service correctly', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  await controller.getAll({}, resMock);

  expect(CarServiceMock.getAll).toHaveBeenCalledTimes(1);
});

test('an error exist in getAll if there is no results', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  CarServiceMock.getAll.mockImplementationOnce(() => Promise.resolve(new NoResultsError('failed')));

  try {
    await controller.getAll({}, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
});

test('getById calls service correctly with the corresponding parameters', async () => {
  const reqMock = {query: {id: 1}};
  const resMock = {
    send: jest.fn(),
    status: function () {
      return this;
    }
  };
  await controller.getById(reqMock, resMock);

  expect(CarServiceMock.getById).toHaveBeenCalledTimes(1);
  expect(CarServiceMock.getById).toHaveBeenCalledWith(reqMock.query.id);
});

test('an error exist in getById without parameters given', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  try {
    await controller.getById({query: {}}, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(UndefinedIdError);
  }
});

test('saveNewCar calls service correctly', async () => {
  const reqMock = {body: {}, file: {}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };
  await controller.saveNewCar(reqMock, resMock);

  expect(CarServiceMock.saveNewCar).toHaveBeenCalledTimes(1);
});

test('saveEditedCar calls service correctly', async () => {
  const reqMock = {query: {id: 1}, body: {}, file: {}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };
  await controller.saveEditedCar(reqMock, resMock);

  expect(CarServiceMock.saveEditedCar).toHaveBeenCalledTimes(1);
});

test('an error exist in saveEditedCar if there is no body or query id', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };
  try {
    await controller.saveEditedCar({query: {}}, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(UndefinedIdError);
  }
});

test('delete calls repository correctly with the corresponding parameters', async () => {
  const reqMock = {query: {id: 1}};
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };
  await controller.delete(reqMock, resMock);

  expect(CarServiceMock.delete).toHaveBeenCalledTimes(1);
  expect(CarServiceMock.delete).toHaveBeenCalledWith(reqMock.query.id);
});

test('an error exist in delete without request query id', async () => {
  const resMock = {
    send: jest.fn(),
    status: function (status) {
      return this;
    }
  };

  try {
    await controller.delete({query: {}}, resMock);
  } catch (err) {
    expect(err).toBeInstanceOf(UndefinedIdError);
  }
});
