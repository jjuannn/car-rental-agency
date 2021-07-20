export default class Rental {
  constructor({
    id,
    price_per_day,
    date_from,
    date_until,
    total_price,
    payment_method,
    is_paid,
    status,
    fk_car,
    fk_client,
    Car,
    Client
  }) {
    this.id = id;
    this.price_per_day = price_per_day;
    this.date_from = date_from;
    this.date_until = date_until;
    this.total_price = total_price;
    this.payment_method = payment_method;
    this.is_paid = is_paid;
    this.status = status;
    this.fk_car = fk_car;
    this.fk_client = fk_client;
    this.Car = Car;
    this.Client = Client;
  }
}
