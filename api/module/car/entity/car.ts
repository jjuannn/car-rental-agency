export default class Car {
  constructor(
    public id: number,
    public brand: string,
    public model: string,
    public year: string,
    public mileage: string,
    public color: string,
    public hasAC: boolean,
    public passengers: string,
    public gearbox_type: string,
    public price_per_day: string,
    public images: string
  ) {}
}
