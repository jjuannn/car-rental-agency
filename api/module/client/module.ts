import ClientRepository from './repository/sqlite/clientRepository';
import ClientModel from './model/clientModel';
import ClientController from './controller/clientController';
import ClientService from './service/clientService';
import DIContainer from 'rsdi';
import express from 'express';
import IClientController from './controller/interface/IClientController';

function initClientModule(app: express.Application, container: DIContainer): void {
  const controller: IClientController = container.get('ClientController');
  controller.configureRoutes(app);
}

export {initClientModule, ClientRepository, ClientModel, ClientController, ClientService};
