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
      if (e instanceof NoResultsError) {
        res.status(400).send({status: 'failed', err: 'Cannot find the rental list'});
      }
      res
        .status(400)
        .send({status: 'failed', err: 'Something failed while getting the rental list'});
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
    } catch (e) {
      if (e instanceof UndefinedIdError) {
        res
          .status(400)
          .send({status: 'failed', err: 'You must introduce an ID to get a rental details'});
      }
      if (e instanceof NoResultsError) {
        res
          .status(400)
          .send({status: 'failed', err: `Cannot find a rental with the ID ${req.query.id}`});
      }
      res.status(400).send({
        status: 'failed',
        err: 'Something failed while getting the rental, but looks like is our fault. Try again :/'
      });
    }
  }

  async saveNewRental(req: express.Request, res: express.Response): Promise<void> {
    const rental: Rental = formToEntity(req.body);
    try {
      const newRental = await this.rentalService.saveNewRental(rental);
      res.status(200).send(newRental);
    } catch (e) {
      if (e instanceof InvalidDatesError) {
        res
          .status(400)
          .send({status: 'failed', err: 'The start date cannot be greater than the finish date'});
      }
      if (e instanceof CarAlreadyRentedError) {
        res
          .status(400)
          .send({status: 'failed', err: 'The car is already rented in the selected dates'});
      }
      res.status(400).send({
        status: 'failed',
        err: 'Something failed while saving the rental, but looks like is our fault. Try again :/'
      });
    }
  }

  async saveEditedRental(req: express.Request, res: express.Response): Promise<void> {
    const rental: Rental = formToEntity(req.body);
    rental.id = Number(req.query.id);
    try {
      const editedRental = await this.rentalService.saveEditedRental(rental);
      res.status(200).send(editedRental);
    } catch (e) {
      if (e instanceof InvalidDatesError) {
        res
          .status(400)
          .send({status: 'failed', err: 'The start date cannot be greater than the finish date'});
      }
      if (e instanceof CarAlreadyRentedError) {
        res
          .status(400)
          .send({status: 'failed', err: 'The car is already rented in the selected dates'});
      }
      res.status(400).send({
        status: 'failed',
        err: 'Something failed while saving the rental, but looks like is our fault. Try again :/'
      });
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
      res.status(200).send({success: true});
    } catch (e) {
      if (e instanceof NoResultsError) {
        res
          .status(400)
          .send({status: 'failed', err: 'Looks like there is not an rental with that ID'});
      }
      res
        .status(400)
        .send({status: 'failed', err: 'Something failed while finishing a rental. Try again :/'});
    }
  }
}
