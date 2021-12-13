/// <reference types="@types/jest" />

import {Sequelize} from 'sequelize';
import CarModel from '../../model/carModel';
import CarRepository from '../sqlite/carRepository';
import Car from '../../entity/car';
import NoResultsError from '../error/noResultsError';

const sequelizeInstance = new Sequelize('sqlite::memory', {logging: false});

let repository;
let carModel;

beforeAll(() => {
  carModel = CarModel.setup(sequelizeInstance);
  repository = new CarRepository(carModel);
});

beforeEach(async () => {
  await sequelizeInstance.sync({force: true});
});

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

test('getAll returns an empty array if the car list is empty', async () => {
  const cars = await repository.getAll();
  expect(cars).toEqual([]);
});

test('getAll returns an array of cars', async () => {
  const savedCar = await repository.saveNewCar(carToSave);
  const carsList = await repository.getAll();

  expect(carsList).toHaveLength(1);
  expect(carsList).toEqual([savedCar]);
});

test('saveNewCar returns the same car after saving it and generates id correctly', async () => {
  const newCar = await repository.saveNewCar(carToSave);

  expect(newCar.id).toEqual(carToSave.id);
  expect(newCar.id).toEqual(1);
});

test('saveEditedCar update a car correctly', async () => {
  const newCar = await repository.saveNewCar(carToSave);
  expect(newCar.id).toEqual(1);

  const editedCar = {...newCar, brand: 'ford'};
  const saveCar = await repository.saveEditedCar(editedCar);

  expect(newCar.id).toEqual(saveCar.id);
});

test('getById returns a Car if the car exist', async () => {
  const newCar = await repository.saveNewCar(carToSave);
  const car = await repository.getById(newCar.id);

  expect(car).toBeInstanceOf(Car);
});

test('getById fails if cannot find a car with the specified id ', async () => {
  let car;
  try {
    car = await repository.getById(500);
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
  expect(car).toBeUndefined();
});

test('delete delete a car and returns a boolean if is success', async () => {
  const newCar = await repository.saveNewCar(carToSave);
  const deleteCar = await repository.delete(newCar.id);

  expect(deleteCar).toBe(true);
});

test('delete fails if cannot find a car with the specified id ', async () => {
  let deleteCar;
  try {
    deleteCar = await repository.delete(500);
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
  expect(deleteCar).toBeUndefined();
});
