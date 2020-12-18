const {Rental} = require('../entity/rental');
const InvalidIdError = require('./error/invalidId');
const InvalidRentalError = require('./error/invalidRental');

module.exports = class RentalService {
  /**
   * @param {import ("../repository/sqlite/rentalRepository")} rentalRepository
   */
  constructor(rentalRepository) {
    this.rentalRepository = rentalRepository;
  }
  /**
   * @param { Rental } rental
   */
  async saveNewRental(rental) {
    if (!(rental instanceof Rental) || rental === undefined) {
      throw new InvalidRentalError();
    }
    const currentRentalsInDate = await this.rentalRepository.findCarRentalsBetweenDates(rental);
    if (currentRentalsInDate.length > 0) {
      throw new Error('This car is already rented during the dates entered!');
    }
    return this.rentalRepository.saveNewRental(rental);
  }
  /**
   * @param { Rental } rental
   */
  async saveEditedRental(rental) {
    if (!(rental instanceof Rental) || rental === undefined) {
      throw new InvalidRentalError();
    }
    const currentRentalsInDate = await this.rentalRepository.findCarRentalsBetweenDates(rental);
    if (currentRentalsInDate.length > 0) {
      throw new Error('This car is already rented during the dates entered!');
    }
    return this.rentalRepository.saveEditedRental(rental);
  }
  /**
   * @param {Number} id
   */
  async getById(id) {
    if (typeof id !== 'number' || id === undefined) {
      throw new InvalidIdError();
    }
    return this.rentalRepository.getById(id);
  }
  /**
   * @param {Rental} rental
   */
  async finish(rental) {
    if (!(rental instanceof Rental) || rental === undefined) {
      throw new InvalidRentalError();
    }
    rental.setFinished();
    this.rentalRepository.saveEditedRental(rental);
    return this.rentalRepository.finish(rental);
  }
  async getAll() {
    return this.rentalRepository.getAll();
  }
};
