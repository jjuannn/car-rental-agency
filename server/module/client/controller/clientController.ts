import AbstractClientController from '../controller/abstractController/abstractController';
import {formToEntity} from '../mapper/mapper';
import UndefinedIdError from './error/undefinedId';
import IClientController from './interface/IClientController';
import express from 'express';
import IClientService from '../service/interface/IClientService';
import NoResultsError from '../repository/error/noResultsError';

export default class ClientController
  extends AbstractClientController
  implements IClientController
{
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
      res.status(200).send(clients);
    } catch (e) {
      if (e instanceof NoResultsError) {
        res.status(400).send({status: 'failed', err: 'Cannot find client list'});
      }
      res
        .status(400)
        .send({status: 'failed', err: 'Something failed while getting the clients list'});
    }
  }

  async getById(req: express.Request, res: express.Response): Promise<void> {
    try {
      if (!req.query.id) {
        throw new UndefinedIdError();
      }
      const id = Number(req.query.id);
      const client = await this.clientService.getById(id);
      res.status(200).send(client);
    } catch (e) {
      if (e instanceof NoResultsError) {
        res.status(400).send({status: 'failed', err: `Cannot find client with ID ${req.query.id}`});
      }
      res.status(400).send({
        status: 'failed',
        err: 'Something failed while getting the client, but looks like is our fault. Try again :/'
      });
    }
  }

  async saveNewClient(req: express.Request, res: express.Response): Promise<void> {
    const client = formToEntity(req.body);
    try {
      const newClient = await this.clientService.saveNewClient(client);
      res.status(200).send(newClient);
    } catch (e) {
      res.status(400).send({
        status: 'failed',
        err: 'Something went wrong while creating a client! Try again :/'
      });
    }
  }

  async saveEditedClient(req: express.Request, res: express.Response): Promise<void> {
    req.body.id = req.query.id;
    const client = formToEntity(req.body);
    try {
      const editedClient = await this.clientService.saveEditedClient(client);
      res.status(200).send(editedClient);
    } catch (e) {
      res
        .status(400)
        .send({status: 'failed', err: 'Something went wrong while editing a client! Try again :/'});
    }
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    try {
      if (!req.query.id) {
        throw new UndefinedIdError();
      }
      const id = Number(req.query.id);
      await this.clientService.delete(id);
      res.status(200).send({success: true});
    } catch (e) {
      if (e instanceof NoResultsError) {
        res.status(400).send({status: 'failed', err: `Cannot find client with ID ${req.query.id}`});
      }
      res
        .status(400)
        .send({status: 'failed', err: 'Something went wrong while deleting a client!'});
    }
  }
}
