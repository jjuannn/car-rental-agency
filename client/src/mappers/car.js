import Car from '../entities/car';

export function apiToEntity(car) {
  return new Car(car);
}
