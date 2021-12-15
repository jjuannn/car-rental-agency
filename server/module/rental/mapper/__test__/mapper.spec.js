import Rental from '../../entity/rental';
import {dbToEntity, formToEntity} from '../mapper';

const body = {
  id: 1,
  fk_car: 1,
  fk_client: 1,
  price_per_day: 200,
  date_from: '20-01-2021',
  date_until: '22-01-2021',
  payment_method: 'cash',
  total_price: 400,
  is_paid: true,
  status: 'active',
  Car: {},
  Client: {}
};

test('formToEntity returns a instance of Rental', async () => {
  const rental = formToEntity(body);
  expect(rental).toBeInstanceOf(Rental);
});

test('dbToEntity returns a instance of Rental', async () => {
  const rental = dbToEntity(body);
  expect(rental).toBeInstanceOf(Rental);
});
