import Client from '../entity/client';
import InvalidIdError from './error/invalidId';
import InvalidClientError from './error/invalidClient';
import IClientService from './interface/IClientService';
import IClientRepository from '../repository/interface/IClientRepository';

export default class Service implements IClientService {
  constructor(public clientRepository: IClientRepository) {}

  async saveNewClient(client: Client): Promise<Client> {
    if (client === undefined) {
      throw new InvalidClientError();
    }
    return this.clientRepository.saveNewClient(client);
  }

  async saveEditedClient(client: Client): Promise<Client> {
    if (client === undefined) {
      throw new InvalidClientError();
    }
    return this.clientRepository.saveEditedClient(client);
  }

  async getById(id: number): Promise<Client> {
    if (id === undefined) {
      throw new InvalidIdError();
    }
    return this.clientRepository.getById(id);
  }

  async delete(id: number): Promise<boolean> {
    if (id === undefined) {
      throw new InvalidIdError();
    }
    return this.clientRepository.delete(id);
  }

  async getAll(): Promise<Client[]> {
    return this.clientRepository.getAll();
  }
}
