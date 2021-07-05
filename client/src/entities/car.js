export default class Car {
  constructor({
    brand,
    color,
    gearbox_type,
    hasAC,
    id,
    images,
    mileage,
    model,
    passengers,
    price_per_day,
    year
  }) {
    this.id = id;
    this.brand = brand;
    this.color = color;
    this.gearbox_type = gearbox_type;
    this.hasAC = hasAC;
    this.images = images;
    this.mileage = mileage;
    this.model = model;
    this.passengers = passengers;
    this.price_per_day = price_per_day;
    this.year = year;
  }
}
