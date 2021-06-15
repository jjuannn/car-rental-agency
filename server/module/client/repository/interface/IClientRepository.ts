import Client from '../../entity/client';

export default interface IClientRepository {
  saveNewClient(newClient: Client): Promise<Client>;
  saveEditedClient(editedClient: Client): Promise<Client>;
  getById(id: number): Promise<Client>;
  getAll(): Promise<Client[]>;
  delete(id: number): Promise<boolean>;
}
