const car = require('../../entity/car');
const {dbToEntity} = require('../../mapper/mapper');
const AbstractCarRepository = require('../abstractRepository/abstractRepository');
const NoResultsError = require('../error/noResultsError');

module.exports = class CarRepository extends AbstractCarRepository {
  constructor(carModel) {
    super();
    this.carModel = carModel;
  }

  /**
   * @param { Car } newCar
   */
  async saveNewCar(newCar) {
    const buildOptions = {isNewRecord: true};
    const saveCar = await this.carModel.create(newCar, buildOptions);

    const {id} = saveCar;
    return this.getById(id);
  }
  /**
   *
   * @param {Car} editedCar
   */
  async saveEditedCar(editedCar) {
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
  /**
   *
   * @param {Number} id
   */
  async getById(id) {
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
    return cars.map(car => dbToEntity(car));
  }
  /**
   * @param {Number} id
   */
  async delete(id) {
    const carToDelete = await this.carModel.findByPk(id);
    if (!carToDelete) {
      throw new NoResultsError();
    }

    carToDelete.destroy();
    return true;
  }
};
