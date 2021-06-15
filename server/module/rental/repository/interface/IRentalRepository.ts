import Rental from '../../entity/rental';

export default interface IRentalRepository {
  saveNewRental(newRental: Rental): Promise<Rental>;
  saveEditedRental(editedRental: Rental): Promise<Rental>;
  getById(id: number): Promise<Rental>;
  getAll(): Promise<Rental[]>;
  finish(rental: Rental): Promise<boolean>;
  findCarRentalsBetweenDates(rental: Rental): Promise<Rental[]> | Promise<[]>;
}
