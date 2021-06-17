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
    const cars = await this.carService.getAll();
    const clients = await this.clientService.getAll();
    if (cars.length === 0 || clients.length === 0) {
      res.redirect('/rental');
    } else {
      res.render('rental/add.html', {data: {cars, clients}});
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
      res.render('rental/edit.html', {data: {rental, cars, clients}});
    } catch (e) {
      res.redirect('/rental');
    }
  }
  async getAll(req: express.Request, res: express.Response): Promise<void> {
    try {
      const rentals = await this.rentalService.getAll();
      res.render('list/rental/main-page.html', {
        data: {rentals}
      });
    } catch (e) {
      res.redirect('/rental');
    }
  }

  async getById(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const rental = await this.rentalService.getById(id);
      res.render('rental/view.html', {data: {rental}});
    } catch (e) {
      res.redirect('/rental');
    }
  }

  async saveNewRental(req: express.Request, res: express.Response): Promise<void> {
    const rental: Rental = formToEntity(req.body);
    try {
      await this.rentalService.saveNewRental(rental);
    } catch (e) {}
    res.redirect('/rental');
  }

  async saveEditedRental(req: express.Request, res: express.Response): Promise<void> {
    const rental: Rental = formToEntity(req.body);
    try {
      await this.rentalService.saveEditedRental(rental);
    } catch (e) {}
    res.redirect('/rental');
  }

  async finish(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const rentalToDelete = await this.rentalService.getById(id);
      await this.rentalService.finish(rentalToDelete);
    } catch (e) {}
    res.redirect('/rental');
  }
}
