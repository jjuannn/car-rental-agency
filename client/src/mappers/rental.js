import Rental from '../entities/rental';

export default function apiToEntity(rental) {
  return new Rental(rental);
}
