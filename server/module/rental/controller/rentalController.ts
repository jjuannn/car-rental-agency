import ICarService from '../../car/service/interface/ICarService';
import IClientService from '../../client/service/interface/IClientService';
import IRentalController from './interface/IRentalController';
import AbstractRentalController from './abstractController/abstractController';
import {formToEntity} from '../mapper/mapper';
import UndefinedIdError from './error/undefinedId';
import Rental from '../entity/rental';
import express from 'express';
import IRentalService from '../service/interface/IRentalService';
import RentalNotPaid from '../service/error/rentalNotPaid';
import InvalidDatesError from '../service/error/invalidDates';
import CarAlreadyRentedError from '../service/error/carAlreadyRented';
import NoResultsError from '../repository/error/noResultsError';

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

    app.post(`${ROUTE_BASE}/new`, this.saveNewRental.bind(this));

    app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedRental.bind(this));

    app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.finish.bind(this));
  }

  async getAll(req: express.Request, res: express.Response): Promise<void> {
    try {
      const rentals = await this.rentalService.getAll();
      res.status(200).send(rentals);
    } catch (e) {
      res.status(400).send({status: 'failed', err: 'Cannot find the rental list'});
    }
  }

  async getById(req: express.Request, res: express.Response): Promise<void> {
    try {
      if (!req.query.id) {
        throw new UndefinedIdError();
      }
      const id = Number(req.query.id);
      const rental = await this.rentalService.getById(id);
      res.status(200).send(rental);
    } catch (e: any) {
      res.status(400).send({status: 'failed', err: e.message});
    }
  }

  async saveNewRental(req: express.Request, res: express.Response): Promise<void> {
    const rental: Rental = formToEntity(req.body);
    try {
      const newRental = await this.rentalService.saveNewRental(rental);
      res.status(200).send(newRental);
    } catch (e: any) {
      res.status(400).send({status: 'failed', err: e.message});
    }
  }

  async saveEditedRental(req: express.Request, res: express.Response): Promise<void> {
    try {
      const rental: Rental = formToEntity(req.body);
      if (!req.query.id) {
        throw new UndefinedIdError();
      }
      rental.id = Number(req.query.id);
      const editedRental = await this.rentalService.saveEditedRental(rental);
      res.status(200).send(editedRental);
    } catch (e: any) {
      res.status(400).send({status: 'failed', err: e.message});
    }
  }

  async finish(req: express.Request, res: express.Response): Promise<void> {
    try {
      if (!req.query.id) {
        throw new UndefinedIdError();
      }
      const id = Number(req.query.id);
      const rentalToDelete = await this.rentalService.getById(id);
      const finished = await this.rentalService.finish(rentalToDelete);
      res.status(200).send({success: true});
    } catch (e: any) {
      res.status(400).send({status: 'failed', err: e.message});
    }
  }
}
