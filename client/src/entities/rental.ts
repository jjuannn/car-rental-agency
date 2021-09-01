import Car from './car';
import Client from './client';

export default class Rental {
  constructor(
    public id: string,
    public price_per_day: string,
    public date_from: string,
    public date_until: string,
    public total_price: string,
    public payment_method: string,
    public is_paid: boolean,
    public status: string,
    public fk_car: string,
    public fk_client: string,
    public Car: Car,
    public Client: Client
  ) {}
}
