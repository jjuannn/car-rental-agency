import {dbToEntity, formToEntity} from '../mapper';
import Car from '../../entity/car';

const body = {
  id: 1,
  brand: 'toyota',
  model: 'corolla',
  year: '2020',
  mileage: '200',
  color: 'red',
  hasAC: true,
  passengers: 'string',
  gearbox_type: 'manual',
  price_per_day: 200,
  images: ''
};

test('formToEntity returns a instance of Car', () => {
  const car = formToEntity(body);
  expect(car).toBeInstanceOf(Car);
});

const model = {
  toJSON: jest.fn(() => {
    return {
      id: 1,
      brand: 'toyota',
      model: 'corolla',
      year: '2020',
      mileage: '200',
      color: 'red',
      hasAC: true,
      passengers: 'string',
      gearbox_type: 'manual',
      price_per_day: 200,
      images: ''
    };
  })
};

test('dbToEntity returns a instance of Car', () => {
  const car = dbToEntity(model);
  expect(car).toBeInstanceOf(Car);
});
