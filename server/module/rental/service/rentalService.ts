import IRentalRepository from '../repository/interface/IRentalRepository';
import IRentalService from './interface/IRentalService';
import Rental from '../entity/rental';
import InvalidIdError from './error/invalidId';
import InvalidRentalError from './error/invalidRental';
import CarAlreadyRentedError from './error/carAlreadyRented';

export default class RentalService implements IRentalService {
  constructor(public rentalRepository: IRentalRepository) {}

  async saveNewRental(rental: Rental): Promise<Rental> {
    if (rental === undefined) {
      throw new InvalidRentalError();
    }
    const currentRentalsInDate = await this.rentalRepository.findCarRentalsBetweenDates(rental);
    if (currentRentalsInDate.length > 0) {
      throw new CarAlreadyRentedError('This car is already rented during the dates entered!');
    }
    rental.evaluateDates();
    return this.rentalRepository.saveNewRental(rental);
  }

  async saveEditedRental(rental: Rental): Promise<Rental> {
    if (rental === undefined) {
      throw new InvalidRentalError();
    }
    const currentRentalsInDate = await this.rentalRepository.findCarRentalsBetweenDates(rental);
    if (currentRentalsInDate.length > 0) {
      throw new CarAlreadyRentedError('This car is already rented during the dates entered!');
    }
    rental.evaluateDates();
    return this.rentalRepository.saveEditedRental(rental);
  }

  async getById(id: number): Promise<Rental> {
    if (id === undefined) {
      throw new InvalidIdError();
    }
    return this.rentalRepository.getById(id);
  }

  async finish(rental: Rental): Promise<boolean> {
    if (rental === undefined) {
      throw new InvalidRentalError();
    }
    const finishedRental = rental.setFinished();
    this.rentalRepository.saveEditedRental(finishedRental);
    return this.rentalRepository.finish(finishedRental);
  }

  async getAll(): Promise<Rental[]> {
    return this.rentalRepository.getAll();
  }
}
