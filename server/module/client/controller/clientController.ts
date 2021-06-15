import AbstractClientController from '../controller/abstractController/abstractController';
import {formToEntity} from '../mapper/mapper';
import UndefinedIdError from './error/undefinedId';
import IClientController from './interface/IClientController';
import express from 'express';
import IClientService from '../service/interface/IClientService';

export default class ClientController
  extends AbstractClientController
  implements IClientController {
  constructor(public clientService: IClientService, public ROUTE_BASE = '/client') {
    super();
  }

  configureRoutes(app: express.Application): void {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.get(`${ROUTE_BASE}/all`, this.getAll.bind(this));

    app.post(`${ROUTE_BASE}/new`, this.saveNewClient.bind(this));

    app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedClient.bind(this));

    app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.delete.bind(this));
  }

  async getAll(req: express.Request, res: express.Response): Promise<void> {
    try {
      const clients = await this.clientService.getAll();
      res.render('list/client/main-page.html', {
        data: {clients}
      });
    } catch (e) {
      res.redirect('/client');
    }
  }

  async getById(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      const client = await this.clientService.getById(id);
      res.render('client/view.html', {data: {client}});
    } catch (e) {
      res.redirect('/client');
    }
  }

  async saveNewClient(req: express.Request, res: express.Response): Promise<void> {
    const client = formToEntity(req.body);
    console.log(client);
    try {
      await this.clientService.saveNewClient(client);
    } catch (e) {}
    res.redirect('/client');
  }

  async saveEditedClient(req: express.Request, res: express.Response): Promise<void> {
    const client = formToEntity(req.body);
    try {
      await this.clientService.saveEditedClient(client);
    } catch (e) {}
    res.redirect('/client');
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      await this.clientService.delete(id);
    } catch (e) {}
    res.redirect('/client');
  }
}
