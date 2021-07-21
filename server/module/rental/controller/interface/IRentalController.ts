import express from 'express';

export default interface IRentalController {
  configureRoutes(app: express.Application): void;
  getAll(req: express.Request, res: express.Response): Promise<void>;
  getById(req: express.Request, res: express.Response): Promise<void>;
  saveNewRental(req: express.Request, res: express.Response): Promise<void>;
  saveEditedRental(req: express.Request, res: express.Response): Promise<void>;
  finish(req: express.Request, res: express.Response): Promise<void>;
}
