import {formToEntity} from '../mapper/mapper';
import UndefinedIdError from './error/undefinedId';
import IClientController from './interface/IClientController';
import IClientService from '../service/interface/IClientService';
import express from 'express';
import {IParams} from './interface/IClientController';

export default class ClientController implements IClientController {
  constructor(public clientService: IClientService, public ROUTE_BASE: string = '/client') {}
  configureRoutes(app: express.Application): void {
    const ROUTE_BASE = this.ROUTE_BASE;

    app.get(`${ROUTE_BASE}`, this.getAll.bind(this));
    app.get(`${ROUTE_BASE}/all`, this.getAll.bind(this));

    app.post(`${ROUTE_BASE}/new`, this.saveNewClient.bind(this));

    app.post(`${ROUTE_BASE}/edit?:id`, this.saveEditedClient.bind(this));

    app.get(`${ROUTE_BASE}/view?:id`, this.getById.bind(this));

    app.get(`${ROUTE_BASE}/delete?:id`, this.delete.bind(this));
  }

  async getAll(args: IParams): Promise<void> {
    const {req, res} = args;
    try {
      const clients = await this.clientService.getAll();
      console.log(clients);
    } catch (e) {
      console.error(e);
    }
  }

  async getById(args: IParams): Promise<void> {
    const {req, res} = args;
    const id = Number(req.query.id);
    const client = await this.clientService.getById(id);
    console.log(client);
  }

  async saveNewClient(args: IParams): Promise<void> {
    const {req, res} = args;
    const client = formToEntity(req.body);
    console.log(client);
    try {
      const newClient = await this.clientService.saveNewClient(client);
      console.log(newClient);
    } catch (e) {
      console.error(e);
    }
  }

  async saveEditedClient(args: IParams): Promise<void> {
    const {req, res} = args;
    const client = formToEntity(req.body);
    try {
      await this.clientService.saveEditedClient(client);
    } catch (e) {
      console.error(e);
    }
    // terminar de consoleloguear todas las operaciones
    // y commitearlo
  }

  async delete(args: IParams): Promise<void> {
    const {req, res} = args;
    if (!req.query.id) {
      throw new UndefinedIdError();
    }
    try {
      const id = Number(req.query.id);
      await this.clientService.delete(id);
    } catch (e) {
      console.error(e);
    }
  }
}
