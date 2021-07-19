import IRentalRepository from '../repository/interface/IRentalRepository';
import IRentalService from './interface/IRentalService';
import Rental from '../entity/rental';
import InvalidIdError from './error/invalidId';
import InvalidRentalError from './error/invalidRental';

export default class RentalService implements IRentalService {
  constructor(public rentalRepository: IRentalRepository) {}

  async saveNewRental(rental: Rental): Promise<Rental> {
    if (!(rental instanceof Rental) || rental === undefined) {
      throw new InvalidRentalError();
    }
    const currentRentalsInDate = await this.rentalRepository.findCarRentalsBetweenDates(rental);
    if (currentRentalsInDate.length > 0) {
      throw new Error('This car is already rented during the dates entered!');
    }
    rental.evaluateDates();
    return this.rentalRepository.saveNewRental(rental);
  }

  async saveEditedRental(rental: Rental): Promise<Rental> {
    if (!(rental instanceof Rental) || rental === undefined) {
      throw new InvalidRentalError();
    }
    const currentRentalsInDate = await this.rentalRepository.findCarRentalsBetweenDates(rental);
    if (currentRentalsInDate.length > 0) {
      throw new Error('This car is already rented during the dates entered!');
    }
    rental.evaluateDates();
    return this.rentalRepository.saveEditedRental(rental);
  }

  async getById(id: number): Promise<Rental> {
    if (typeof id !== 'number' || id === undefined) {
      throw new InvalidIdError();
    }
    return this.rentalRepository.getById(id);
  }

  async finish(rental: Rental): Promise<boolean> {
    if (!(rental instanceof Rental) || rental === undefined) {
      throw new InvalidRentalError();
    }
    rental.setFinished();
    this.rentalRepository.saveEditedRental(rental);
    return this.rentalRepository.finish(rental);
  }

  async getAll(): Promise<Rental[]> {
    return this.rentalRepository.getAll();
  }
}
