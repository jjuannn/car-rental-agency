import {formToEntity} from '../mapper/mapper';
import UndefinedIdError from './error/undefinedId';
import IRentalController from './interface/IRentalController';
import {IParams} from './interface/IRentalController';
import express from 'express';
import ICarController from '../../car/controller/interface/ICarController';
import IClientController from '../../client/controller/interface/IClientController';
import IRentalService from '../service/interface/IRentalService';

export default class RentalController implements IRentalController {
  constructor(
    public rentalService: IRentalService,
    public carController: ICarController,
    public clientController: IClientController,
    public ROUTE_BASE: string = '/rental'
  ) {}

  configureRoutes(app: express.Application): void {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.get(`${ROUTE_BASE}`, this.getAll.bind(this));
    app.get(`${ROUTE_BASE}/all`, this.getAll.bind(this));

    app.post(`${ROUTE_BASE}/new`, this.saveNewRental.bind(this));

    app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedRental.bind(this));

    app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.finish.bind(this));
  }

  async getAll(args: IParams): Promise<void> {
    const rentals = await this.rentalService.getAll();
    console.log(rentals);
  }

  async getById(args: IParams): Promise<void> {
    const {req, res} = args;
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const rental = await this.rentalService.getById(id);
      console.log(rental);
    } catch (e) {
      console.error(e);
    }
  }

  async saveNewRental(args: IParams): Promise<void> {
    const {req, res} = args;
    const rental = formToEntity(req.body);
    try {
      const newRental = await this.rentalService.saveNewRental(rental);
      console.log(newRental);
    } catch (e) {
      console.error(e);
    }
  }

  async saveEditedRental(args: IParams): Promise<void> {
    const {req, res} = args;
    const rental = formToEntity(req.body);
    try {
      const editedRental = await this.rentalService.saveEditedRental(rental);
      console.log(editedRental);
    } catch (e) {
      console.error(e);
    }
  }

  async finish(args: IParams): Promise<void> {
    const {req, res} = args;
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const rentalToDelete = await this.rentalService.getById(id);
      const deleted = await this.rentalService.finish(rentalToDelete);
      console.log(deleted);
    } catch (e) {
      console.error(e);
    }
  }
}
