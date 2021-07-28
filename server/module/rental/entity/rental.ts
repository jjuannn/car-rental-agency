import Car from '../../car/entity/car';
import Client from '../../client/entity/client';
import RentalNotPaidError from '../service/error/rentalNotPaid';
import InvalidDatesError from '../service/error/invalidDates';

export default class Rental {
  constructor(
    public id: number,
    public fk_car: number,
    public fk_client: number,
    public price_per_day: number,
    public date_from: string,
    public date_until: string,
    public total_price: number | string,
    public payment_method: string,
    public is_paid: boolean,
    public status: string,
    public Car: Car | {},
    public Client: Client | {}
  ) {
    this.total_price = this.calculateTotalPrice();
  }

  private calculateTotalPrice() {
    let from = new Date(this.date_from);
    let until = new Date(this.date_until);

    let differenceInTime = until.getTime() - from.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return (this.total_price = String(differenceInDays * Number(this.price_per_day)));
  }

  public setFinished() {
    if (this.is_paid !== true) {
      throw new RentalNotPaidError("The rental isn't paid yet!");
    }
    this.status = 'finished';
    return this;
  }

  public evaluateDates() {
    const from = new Date(this.date_from).getTime();
    const until = new Date(this.date_until).getTime();

    if (from > until) {
      throw new InvalidDatesError('The start date cannot be greater than the finish date');
    }
    return this;
  }
}
