import Car from '../entities/car';

export function apiToEntity({
  brand,
  color,
  gearbox_type,
  hasAC,
  id,
  images,
  mileage,
  model,
  passengers,
  price_per_day,
  year
}: Car): Car {
  return new Car(
    brand,
    color,
    gearbox_type,
    hasAC,
    id,
    images,
    mileage,
    model,
    passengers,
    price_per_day,
    year
  );
}
