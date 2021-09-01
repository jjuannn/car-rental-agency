import Rental from '../entities/rental';

export default function apiToEntity({
  id,
  price_per_day,
  date_from,
  date_until,
  total_price,
  payment_method,
  is_paid,
  status,
  fk_car,
  fk_client,
  Car,
  Client
}: Rental) {
  return new Rental(
    id,
    price_per_day,
    date_from,
    date_until,
    total_price,
    payment_method,
    is_paid,
    status,
    fk_car,
    fk_client,
    Car,
    Client
  );
}
