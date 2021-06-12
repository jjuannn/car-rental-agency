import {dbToEntity} from '../../mapper/mapper';
import NoResultsError from '../error/noResultsError';
import ICarRepository from '../interface/ICarRepository';
import CarModel from '../../model/carModel';
import Car from '../../entity/car';

export default class CarRepository implements ICarRepository {
  constructor(public carModel: typeof CarModel) {}
  async saveNewCar(newCar: Car): Promise<Car> {
    const buildOptions = {isNewRecord: true};
    const saveCar: any = await this.carModel.create(newCar, buildOptions);
    const {id} = saveCar;
    return this.getById(id);
  }

  async saveEditedCar(editedCar: Car): Promise<Car> {
    const newValues = ({
      brand: editedCar.brand,
      model: editedCar.model,
      year: editedCar.year,
      mileage: editedCar.mileage,
      color: editedCar.color,
      hasAC: editedCar.hasAC,
      passengers: editedCar.passengers,
      price_per_day: editedCar.price_per_day,
      gearbox_type: editedCar.gearbox_type
    } = editedCar);

    if (editedCar.images) {
      newValues.images = editedCar.images;
    }

    const currentCarId = editedCar.id;
    const buildOptions = {isNewRecord: false, where: {id: currentCarId}};
    await this.carModel.update(newValues, buildOptions);

    return this.getById(currentCarId);
  }

  async getById(id: number): Promise<Car> {
    const car = await this.carModel.findOne({where: {id}});
    if (!car) {
      throw new NoResultsError();
    }
    return dbToEntity(car);
  }
  async getAll() {
    const cars = await this.carModel.findAll();
    if (!cars) {
      throw new NoResultsError();
    }
    return cars.map((car: CarModel) => dbToEntity(car));
  }

  async delete(id: number): Promise<Boolean> {
    const carToDelete = await this.carModel.findByPk(id);
    if (!carToDelete) {
      throw new NoResultsError();
    }

    carToDelete.destroy();
    return true;
  }
}
