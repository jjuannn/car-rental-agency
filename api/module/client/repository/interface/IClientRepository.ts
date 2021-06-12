import Client from '../../entity/client';

export default interface IClientRepository {
  saveNewClient(client: Client): Promise<Client>;
  saveEditedClient(client: Client): Promise<Client>;
  getById(id: number): Promise<Client>;
  getAll(): Promise<Client[]>;
  delete(id: number): Promise<boolean>;
}
