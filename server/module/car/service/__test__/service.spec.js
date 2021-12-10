import CarService from '../carService';
import Car from '../../entity/car';
import InvalidCarError from '../error/invalidCar';
import InvalidIdError from '../error/invalidId';

const repositoryMock = {
  saveNewCar: jest.fn(() => Promise.resolve()),
  saveEditedCar: jest.fn(() => Promise.resolve()),
  getById: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
  getAll: jest.fn(() => Promise.resolve())
};

const service = new CarService(repositoryMock);

const carToSave = new Car(
  1,
  'toyoya',
  'corolla',
  '2020',
  '200',
  'red',
  true,
  '4',
  'manual',
  '200',
  ''
);

test('saveNewCar calls repository with a valid entity', async () => {
  await service.saveNewCar(carToSave);

  expect(repositoryMock.saveNewCar).toHaveBeenCalledTimes(1);
  expect(repositoryMock.saveNewCar).toHaveBeenCalledWith(carToSave);
});

test('saveNewCar fails if the car is undefined', async () => {
  let car;
  try {
    car = await service.saveNewCar();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidCarError);
  }
  expect(car).toBeUndefined();
});

test('saveEditedCar calls repository with a valid entity ', async () => {
  await service.saveEditedCar(carToSave);

  expect(repositoryMock.saveEditedCar).toHaveBeenCalledTimes(1);
  expect(repositoryMock.saveEditedCar).toHaveBeenCalledWith(carToSave);
});

test('saveEditedCar fails if the car is undefined', async () => {
  let car;
  try {
    car = await service.saveEditedCar();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidCarError);
  }
  expect(car).toBeUndefined();
});

test('getById calls repository with a valid parameter', async () => {
  await service.getById(1);

  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
  expect(repositoryMock.getById).toHaveBeenCalledWith(1);
});

test('getById fails if the id is undefined', async () => {
  let car;
  try {
    car = await service.getById();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidIdError);
  }
  expect(car).toBeUndefined();
});

test('delete calls repository correctly with a valid parameter', async () => {
  await service.delete(1);

  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
  expect(repositoryMock.delete).toHaveBeenCalledWith(1);
});

test('delete fails is the id is undefined', async () => {
  let car;
  try {
    car = await service.delete();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidIdError);
  }
  expect(car).toBeUndefined();
});

test('getAll calls repository correctly', async () => {
  await service.getAll();

  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
