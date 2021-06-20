import ICarService from '../../car/service/interface/ICarService';
import IClientService from '../../client/service/interface/IClientService';
import IRentalController from './interface/IRentalController';
import AbstractRentalController from './abstractController/abstractController';
import {formToEntity} from '../mapper/mapper';
import UndefinedIdError from './error/undefinedId';
import Rental from '../entity/rental';
import express from 'express';
import IRentalService from '../service/interface/IRentalService';

export default class RentalController
  extends AbstractRentalController
  implements IRentalController {
  constructor(
    public rentalService: IRentalService,
    public carService: ICarService,
    public clientService: IClientService,
    public ROUTE_BASE = '/rental'
  ) {
    super();
  }

  configureRoutes(app: express.Application): void {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.get(`${ROUTE_BASE}/all`, this.getAll.bind(this));

    app.get(`${ROUTE_BASE}/new`, this.newRental.bind(this));
    app.post(`${ROUTE_BASE}/new`, this.saveNewRental.bind(this));

    app.get(`${ROUTE_BASE}/edit?:id`, this.editRental.bind(this));
    app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedRental.bind(this));

    app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.finish.bind(this));
  }

  async newRental(req: express.Request, res: express.Response): Promise<void> {
    try {
      const cars = await this.carService.getAll();
      const clients = await this.clientService.getAll();
      res.status(200).send({cars, clients});
    } catch (e) {
      res.status(400).send({status: 'failed', err: 'something failed while creating the rental!'});
    }
  }
  async editRental(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const rental = await this.rentalService.getById(id);
      const cars = await this.carService.getAll();
      const clients = await this.clientService.getAll();
      res.status(200).send({rental, cars, clients});
    } catch (e) {
      res.status(400).send({status: 'failed', err: 'something failed while editing the rental!'});
    }
  }
  async getAll(req: express.Request, res: express.Response): Promise<void> {
    try {
      const rentals = await this.rentalService.getAll();
      res.status(200).send(rentals);
    } catch (e) {
      res.status(400).send({status: 'failed', err: 'something failed while getting the rentals!'});
    }
  }

  async getById(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const rental = await this.rentalService.getById(id);
      res.status(200).send(rental);
    } catch (e) {
      res.status(400).send('failed');
    }
  }

  async saveNewRental(req: express.Request, res: express.Response): Promise<void> {
    const rental: Rental = formToEntity(req.body);
    try {
      const newRental = await this.rentalService.saveNewRental(rental);
      res.status(200).send(newRental);
    } catch (e) {
      res.status(400).send({status: 'failed', err: 'something failed while saving the rental!'});
    }
  }

  async saveEditedRental(req: express.Request, res: express.Response): Promise<void> {
    const rental: Rental = formToEntity(req.body);
    try {
      const editedRental = await this.rentalService.saveEditedRental(rental);
      res.status(200).send(editedRental);
    } catch (e) {
      res.status(400).send({status: 'failed', err: 'something failed while editing the rental!'});
    }
  }

  async finish(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const rentalToDelete = await this.rentalService.getById(id);
      const finished = await this.rentalService.finish(rentalToDelete);
      res.status(200).send(finished);
    } catch (e) {
      res.status(400).send("the rental isn't paid yet!");
    }
  }
}
