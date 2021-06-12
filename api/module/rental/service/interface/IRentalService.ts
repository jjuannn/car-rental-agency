import Rental from '../../entity/rental';

export default interface IRentalService {
  saveNewRental(newRental: Rental): Promise<Rental>;
  saveEditedRental(editedRental: Rental): Promise<Rental>;
  getById(id: number): Promise<Rental>;
  finish(rental: Rental): Promise<boolean>;
  getAll(): Promise<Rental[]>;
}
