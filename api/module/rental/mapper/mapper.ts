import Rental from '../entity/rental';

export function formToEntity(rental): Rental {
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
    null,
    null
  );
}

export function dbToEntity(model): Rental {
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
  } = model.toJSON();
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
