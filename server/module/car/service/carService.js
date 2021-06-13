const {Car} = require('../entity/car');
const InvalidIdError = require('./error/invalidId');
const InvalidCarError = require('./error/invalidCar');

module.exports = class Service {
  /**
   * @param {import ("../repository/abstractRepository/abstractRepository")} carRepository
   */
  constructor(carRepository) {
    this.carRepository = carRepository;
  }
  /**
   * @param { Car } car
   */
  async saveNewCar(car) {
    if (!(car instanceof Car) || car === undefined) {
      throw new InvalidCarError();
    }
    return this.carRepository.saveNewCar(car);
  }
  /**
   * @param { Car } car
   */
  async saveEditedCar(car) {
    if (!(car instanceof Car) || car === undefined) {
      throw new InvalidCarError();
    }
    return this.carRepository.saveEditedCar(car);
  }
  /**
   * @param {Number} id
   */
  async getById(id) {
    if (typeof id !== 'number' || id === undefined) {
      throw new InvalidIdError();
    }
    return this.carRepository.getById(id);
  }
  /**
   * @param {Number} id
   */
  async delete(id) {
    if (typeof id !== 'number' || id === undefined) {
      throw new InvalidIdError();
    }
    return this.carRepository.delete(id);
  }
  async getAll() {
    return this.carRepository.getAll();
  }
};
