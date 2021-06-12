import express from 'express';

export default interface IClientController {
  configureRoutes(app: express.Application): void;
  getAll(req: express.Request, res: express.Response): Promise<void>;
  getById(req: express.Request, res: express.Response): Promise<void>;
  saveNewClient(req: express.Request, res: express.Response): Promise<void>;
  saveEditedClient(req: express.Request, res: express.Response): Promise<void>;
  delete(req: express.Request, res: express.Response): Promise<void>;
}
