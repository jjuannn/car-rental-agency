import Rental from '../../entity/rental';

export default interface IRentalService {
  saveNewRental(rental: Rental): Promise<Rental>;
  saveEditedRental(rental: Rental): Promise<Rental>;
  getById(id: number): Promise<Rental>;
  finish(rental: Rental): Promise<boolean>;
  getAll(): Promise<Rental[]>;
}
