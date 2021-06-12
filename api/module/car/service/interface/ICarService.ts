import Car from '../../entity/car';

export default interface ICarService {
  saveNewCar(car: Car): Promise<Car>;
  saveEditedCar(car: Car): Promise<Car>;
  getById(id: number): Promise<Car>;
  delete(id: number): Promise<Boolean>;
  getAll(): Promise<Car[]>;
}
