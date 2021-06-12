import Car from '../../entity/car';

export default interface ICarRepository {
  saveNewCar(newCar: Car): Promise<Car>;
  saveEditedCar(editedCar: Car): Promise<Car>;
  getById(id: number): Promise<Car>;
  getAll(): Promise<Car[]>;
  delete(id: number): Promise<Boolean>;
}
