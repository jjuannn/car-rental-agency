import Rental from '../entity/rental';

export function formToEntity(rental) {
  const {
    id,
    fk_car,
    fk_client,
    price_per_day,
    date_from,
    date_until,
    payment_method,
    total_price,
    is_paid,
    status
  } = rental;

  return new Rental(
    Number(id),
    fk_car,
    fk_client,
    price_per_day,
    date_from,
    date_until,
    payment_method,
    total_price,
    is_paid,
    status,
    {},
    {}
  );
}

export function dbToEntity(rentalModel) {
  const {
    id,
    fk_car,
    fk_client,
    price_per_day,
    date_from,
    date_until,
    payment_method,
    total_price,
    is_paid,
    status,
    Car,
    Client
  } = rentalModel;
  return new Rental(
    id,
    fk_car,
    fk_client,
    price_per_day,
    date_from,
    date_until,
    payment_method,
    total_price,
    is_paid,
    status,
    Car,
    Client
  );
}
