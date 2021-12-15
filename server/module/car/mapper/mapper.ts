import Car from '../entity/car';
import {CarModel} from '../module';
export function formToEntity(car: Car): Car {
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
  );
}

export function dbToEntity(carModel: typeof CarModel): Car {
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
  } = carModel.toJSON();
  const image_url = `https://car-rental-agency-j.herokuapp.com${images}`;
  return new Car(
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
    image_url
  );
}
