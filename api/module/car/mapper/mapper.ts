import Car from '../entity/car';

export function formToEntity(car): Car {
  const {
    id,
    brand,
    model,
    year,
    mileage,
    color,
    hasAC,
    passengers,
    gearbox_type,
    price_per_day,
    images
  } = car;

  return new Car(
    Number(id),
    brand,
    model,
    year,
    mileage,
    color,
    hasAC,
    passengers,
    gearbox_type,
    price_per_day,
    images
  );
}

export function dbToEntity(model): Car {
  const {
    id,
    brand,
    mode,
    year,
    mileage,
    color,
    hasAC,
    passengers,
    gearbox_type,
    price_per_day,
    images
  } = model.toJSON();
  return new Car(
    id,
    brand,
    mode,
    year,
    mileage,
    color,
    hasAC,
    passengers,
    gearbox_type,
    price_per_day,
    images
  );
}
