/// <reference types="@types/jest" />

import {Sequelize} from 'sequelize';
import CarModel from '../../../car/model/carModel';
import ClientModel from '../../../client/model/clientModel';
import RentalModel from '../../model/rentalModel';
import RentalRepository from '../postgres/rentalRepository';
import Rental from '../../entity/rental';
import NoResultsError from '../error/noResultsError';

const sequelizeInstance = new Sequelize('sqlite::memory', {
  logging: false
});

let repository;

beforeAll(() => {
  const carModel = CarModel.setup(sequelizeInstance);
  const clientModel = ClientModel.setup(sequelizeInstance);
  const rentalModel = RentalModel.setup(sequelizeInstance);

  rentalModel.belongsTo(carModel);
  rentalModel.belongsTo(clientModel);

  repository = new RentalRepository(rentalModel, clientModel, carModel);
});

beforeEach(async () => {
  await sequelizeInstance.sync({force: true});
});

const rentalToSave = {
  id: 1,
  fk_car: '13',
  fk_client: '9',
  price_per_day: '444',
  date_from: '2021-09-06',
  date_until: '2021-09-09',
  total_price: '1332',
  payment_method: 'debit card',
  is_paid: 'true',
  status: undefined,
  Car: {},
  Client: {}
};

test('saveNewRental returns a Rental and generates an id', async () => {
  const saveRental = await repository.saveNewRental(rentalToSave);
  expect(saveRental).toBeInstanceOf(Rental);
  expect(saveRental.id).toEqual(1);
});

test('saveEditedRental updates a rental', async () => {
  const saveRental = await repository.saveNewRental(rentalToSave);
  const editedValues = {...rentalToSave, payment_method: 'cash'};
  const editRental = await repository.saveEditedRental(editedValues);

  expect(editRental.id).toEqual(saveRental.id);
  expect(editRental.payment_method).not.toEqual(rentalToSave.payment_method);
});

test('getById fails if cannot find a rental with the id', async () => {
  let rental;
  try {
    rental = await repository.getById(30);
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
  expect(rental).toBeUndefined();
});

test('getById returns a Rental', async () => {
  const saveRental = await repository.saveNewRental(rentalToSave);
  const rental = await repository.getById(saveRental.id);

  expect(rental).toBeInstanceOf(Rental);
});

test('getAll returns an array of rentals', async () => {
  const saveRental = await repository.saveNewRental(rentalToSave);
  const list = await repository.getAll();

  expect(list).toEqual([saveRental]);
  expect(list.length).toBe(1);
});

test('finish fails if cannot find a rental with the id', async () => {
  try {
    await repository.finish({id: 20});
  } catch (err) {
    expect(err).toBeInstanceOf(NoResultsError);
  }
});

test('finish returns true if deleted a rental', async () => {
  const saveRental = await repository.saveNewRental(rentalToSave);
  const finish = await repository.finish(saveRental);

  expect(finish).toBe(true);
});
