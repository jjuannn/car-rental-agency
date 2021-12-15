import AbstractCarController from './abstractController/abstractController';
import {formToEntity} from '../mapper/mapper';
import UndefinedIdError from './error/undefinedId';
import ICarController from './interface/ICarController';
import Car from '../entity/car';
import express from 'express';
import multer from 'multer';
import ICarService from '../service/interface/ICarService';
import NoResultsError from '../repository/error/noResultsError';
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
      this.uploadMiddleware.single('images'),
      this.saveNewCar.bind(this)
    );

    app.post(
      `${ROUTE_BASE}/edit?:id`,
      this.uploadMiddleware.single('images'),
      this.saveEditedCar.bind(this)
    );

    app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.delete.bind(this));
  }

  async getAll(req: express.Request, res: express.Response): Promise<void> {
    try {
      const cars = await this.carService.getAll();
      res.status(200).send(cars);
    } catch (e) {
      if (e instanceof NoResultsError) {
        res.status(400).send({status: 'failed', err: 'Cannot find car list'});
      }
      res.status(400).send({status: 'failed', err: 'Something failed while getting the car list'});
    }
  }

  async getById(req: express.Request, res: express.Response): Promise<void> {
    try {
      if (!req.query || !req.query.id) {
        throw new UndefinedIdError();
      }
      const id = Number(req.query.id);
      const car = await this.carService.getById(id);
      res.status(200).send(car);
    } catch (e) {
      if (e instanceof NoResultsError) {
        res.status(400).send({status: 'failed', err: `Cannot find car with ID ${req.query.id}`});
      }
      res.status(400).send({status: 'failed', err: 'Something failed while getting a car'});
    }
  }

  async saveNewCar(req: express.Request, res: express.Response): Promise<void> {
    try {
      const car: Car = formToEntity(req.body);
      if (req.file) {
        car.images = `/uploads/${req.file.filename}`;
      }
      const newCar = await this.carService.saveNewCar(car);
      res.status(200).send(newCar);
    } catch (e) {
      res.status(400).send({status: 'failed', err: 'Something failed while creating a car'});
    }
  }

  async saveEditedCar(req: express.Request, res: express.Response): Promise<void> {
    try {
      if (!req.query.id) {
        throw new UndefinedIdError();
      }
      req.body.id = req.query.id;
      const car: Car = formToEntity(req.body);
      if (req.file) {
        car.images = `/uploads/${req.file.filename}`;
      }

      const editedCar = await this.carService.saveEditedCar(car);
      res.status(200).send(editedCar);
    } catch (e) {
      res.status(400).send({status: 'failed', err: 'Something failed while editing a car!'});
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      if (!req.query.id) {
        throw new UndefinedIdError();
      }

      const id = Number(req.query.id);
      await this.carService.delete(id);
      res.status(200).send({success: true});
    } catch (e) {
      if (e instanceof NoResultsError) {
        res.status(400).send({status: 'failed', err: `Cannot find car with ID ${req.query.id}`});
      }
      res.status(400).send({status: 'failed', err: 'Something failed while deleting a car'});
    }
  }
}
