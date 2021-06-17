import AbstractCarController from './abstractController/abstractController';
import {formToEntity} from '../mapper/mapper';
import UndefinedIdError from './error/undefinedId';
import ICarController from './interface/ICarController';
import Car from '../entity/car';
import express from 'express';
import multer from 'multer';
import ICarService from '../service/interface/ICarService';
export default class CarController extends AbstractCarController implements ICarController {
  constructor(
    public uploadMiddleware: multer.Multer,
    public carService: ICarService,
    public ROUTE_BASE = '/car'
  ) {
    super();
  }

  configureRoutes(app: express.Application): void {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.get(`${ROUTE_BASE}`, this.getAll.bind(this));
    app.get(`${ROUTE_BASE}/all`, this.getAll.bind(this));

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

  async getAll(req: express.Request, res: express.Response): Promise<void> {
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
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const car = await this.carService.getById(id);
      res.render('car/view.html', {data: {car}});
    } catch (e) {
      res.redirect('/car');
    }
  }

  async saveNewCar(req: express.Request, res: express.Response): Promise<void> {
    const car: Car = formToEntity(req.body);
    // if (req.body) {
    //   car.images = `/uploads/${req.file.filename}`;
    // }
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
    // if (req.file) {
    //   car.images = `/uploads/${req.file.filename}`;
    // }
    try {
      await this.carService.saveEditedCar(car);
    } catch (e) {}
    res.redirect('/car');
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      await this.carService.delete(id);
    } catch (e) {}
    res.redirect('/car');
  }
}
