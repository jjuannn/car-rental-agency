import Car from '../../../entity/car';

export default interface ICarRepository {
  saveNewCar(car: Car): Promise<Car>;
  saveEditedCar(car: Car): Promise<Car>;
  getById(id: number): Promise<Car>;
  getAll(): Promise<Car[]>;
  delete(id: number): Promise<boolean>;
}
