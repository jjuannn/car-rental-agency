import RentalService from '../rentalService';
import InvalidRentalError from '../error/invalidRental';
import CarAlreadyRentedError from '../error/carAlreadyRented';
import Rental from '../../entity/rental';
import InvalidIdError from '../error/invalidId';

const repositoryMock = {
  saveNewRental: jest.fn(() => Promise.resolve()),
  saveEditedRental: jest.fn(() => Promise.resolve()),
  getById: jest.fn(() => Promise.resolve()),
  getAll: jest.fn(() => Promise.resolve()),
  finish: jest.fn(() => Promise.resolve()),
  findCarRentalsBetweenDates: jest.fn(() => Promise.resolve())
};

const service = new RentalService(repositoryMock);

const rentalSave = new Rental(
  1,
  1,
  1,
  200,
  '20-01-2021',
  '25-01-2021',
  '200',
  'cash',
  true,
  'active',
  {},
  {}
);

test('saveNewRental fails if the rental is undefined', async () => {
  try {
    await service.saveNewRental();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidRentalError);
    expect(repositoryMock.saveNewRental).toHaveBeenCalledTimes(0);
  }
});

test('saveNewRental fails if there if the car is rented between the specified dates', async () => {
  repositoryMock.findCarRentalsBetweenDates.mockImplementationOnce(() => Promise.resolve([{}, {}]));

  try {
    await service.saveNewRental({});
  } catch (err) {
    expect(err).toBeInstanceOf(CarAlreadyRentedError);
    expect(repositoryMock.saveNewRental).toHaveBeenCalledTimes(0);
  }
});

test('saveNewRental calls repository correctly', async () => {
  repositoryMock.findCarRentalsBetweenDates.mockImplementationOnce(() => Promise.resolve([]));
  await service.saveNewRental(rentalSave);

  expect(repositoryMock.saveNewRental).toHaveBeenCalledTimes(1);
  expect(repositoryMock.saveNewRental).toHaveBeenCalledWith(rentalSave);
});

test('saveEditedRental fails if the rental is undefined', async () => {
  try {
    await service.saveEditedRental();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidRentalError);
    expect(repositoryMock.saveEditedRental).toHaveBeenCalledTimes(0);
  }
});

test('saveEditedRental fails if the car is rented between the selected dates', async () => {
  repositoryMock.findCarRentalsBetweenDates.mockImplementationOnce(() => Promise.resolve([{}, {}]));

  try {
    await service.saveEditedRental(rentalSave);
  } catch (err) {
    expect(err).toBeInstanceOf(CarAlreadyRentedError);
    expect(repositoryMock.saveEditedRental).toHaveBeenCalledTimes(0);
  }
});

test('saveEditedRental calls repository correctly', async () => {
  repositoryMock.findCarRentalsBetweenDates.mockImplementationOnce(() => Promise.resolve([]));
  await service.saveEditedRental(rentalSave);

  expect(repositoryMock.saveEditedRental).toHaveBeenCalledTimes(1);
  expect(repositoryMock.saveEditedRental).toHaveBeenCalledWith(rentalSave);
});

test('getAll calls repository correctly', async () => {
  await service.getAll();

  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});

test('getById fails if the id is undefined', async () => {
  try {
    await service.getById();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidIdError);
    expect(repositoryMock.getById).toHaveBeenCalledTimes(0);
  }
});

test('getById calls repository correctly', async () => {
  await service.getById(2);

  expect(repositoryMock.getById).toHaveBeenCalledTimes(1);
  expect(repositoryMock.getById).toHaveBeenCalledWith(2);
});

test('finish fails if the rental is undefined', async () => {
  try {
    await service.finish();
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidRentalError);
    expect(repositoryMock.finish).toHaveBeenCalledTimes(0);
  }
});

test('finish calls repository correctly', async () => {
  await service.finish(rentalSave);

  expect(repositoryMock.finish).toHaveBeenCalledTimes(1);
  expect(repositoryMock.finish).toHaveBeenCalledWith(rentalSave);
  expect(repositoryMock.saveEditedRental).toHaveBeenCalledWith(rentalSave);
});
