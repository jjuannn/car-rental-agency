import {formToEntity} from '../mapper/mapper';
import Car from '../entity/car';
import ICarController from './interface/ICarController';
import ICarService from '../service/interface/ICarService';
import express from 'express';

export default class CarController implements ICarController {
  constructor(
    public uploadMiddleware,
    public carService: ICarService,
    public ROUTE_BASE: string = '/car'
  ) {}
  configureRoutes(app: express.Application): void {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.get(`${ROUTE_BASE}`, this.renderList.bind(this));
    app.get(`${ROUTE_BASE}/all`, this.renderList.bind(this));
    app.post(
      `${ROUTE_BASE}/new`,
      this.uploadMiddleware.single('car_image'),
      this.saveNewCar.bind(this)
    );

    app.post(
      `${ROUTE_BASE}/edit?:id`,
      this.uploadMiddleware.single('car_image'),
      this.saveEditedCar.bind(this)
    );

    app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.delete.bind(this));
  }

  async renderList(req: express.Request, res: express.Response): Promise<void> {
    try {
      const cars = await this.carService.getAll();
      console.log(cars);
      res.send(cars);
    } catch (e) {
      console.error(e);
    }
  }

  async getById(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      //throw new UndefinedIdError();
      console.error('failed');
    }
    try {
      const id = Number(req.query.id);
      const car = await this.carService.getById(id);
      console.log(car);
    } catch (e) {
      console.error(e);
    }
  }
  async saveNewCar(req: express.Request, res: express.Response): Promise<void> {
    const car: Car = formToEntity(req.body);
    if (req.file) {
      car.images = `/uploads/${req.file.filename}`;
    }
    try {
      const savedCar = await this.carService.saveNewCar(car);
      console.log(savedCar);
      res.send('working! ');
    } catch (e) {
      console.error(e);
    }
  }
  async saveEditedCar(req: express.Request, res: express.Response): Promise<void> {
    const car: Car = formToEntity(req.body);
    if (req.file) {
      car.images = `/uploads/${req.file.filename}`;
    }
    try {
      const savedCar = await this.carService.saveEditedCar(car);
      console.log(savedCar);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      //throw new UndefinedIdError();
      console.error('failed');
    }
    try {
      const id = Number(req.query.id);
      const deleted = await this.carService.delete(id);
      console.log(deleted);
    } catch (e) {
      console.error(e);
    }
  }
}
