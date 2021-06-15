import Client from '../../entity/client';

export default interface IClientService {
  saveNewClient(client: Client): Promise<Client>;
  saveEditedClient(client: Client): Promise<Client>;
  getById(id: number): Promise<Client>;
  delete(id: number): Promise<boolean>;
  getAll(): Promise<Client[]>;
}
