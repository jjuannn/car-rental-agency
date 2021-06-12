import Car from '../../car/entity/car';
import Client from '../../client/entity/client';

export default class Rental {
  constructor(
    public id: number,
    public fk_car: string,
    public fk_client: string,
    public price_per_day: string,
    public date_from: string,
    public date_until: string,
    public total_price: number,
    public payment_method: string,
    public is_paid: boolean,
    public status: string,
    public Car: Car | null,
    public Client: Client | null
  ) {}

  calculateTotalPrice(): number {
    let from = new Date(this.date_from);
    let until = new Date(this.date_until);

    let differenceInTime = until.getTime() - from.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return (this.total_price = differenceInDays * Number(this.price_per_day));
  }
  setFinished(): this {
    if (this.is_paid !== true) {
      throw new Error("The rental isn't paid yet!");
    }
    this.status = 'finished';
    return this;
  }
}
