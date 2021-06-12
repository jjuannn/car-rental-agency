import {dbToEntity} from '../../mapper/mapper';
import NoResultsError from '../error/noResultsError';
import IClientRepository from '../interface/IClientRepository';
import Client from '../../entity/client';
import {ClientModel} from '../../module';

export default class ClientRepository implements IClientRepository {
  constructor(public clientModel: typeof ClientModel) {}

  async saveNewClient(newclient: Client): Promise<Client> {
    const buildOptions = {isNewRecord: true};
    const saveclient: any = await this.clientModel.create(newclient, buildOptions);
    const {id} = saveclient;
    return this.getById(id);
  }

  async saveEditedClient(editedclient: Client): Promise<Client> {
    const newValues = ({
      name: editedclient.name,
      surname: editedclient.surname,
      doc_type: editedclient.doc_type,
      doc_num: editedclient.doc_num,
      address: editedclient.address,
      phone: editedclient.phone,
      e_mail: editedclient.e_mail,
      nationality: editedclient.nationality,
      birthdate: editedclient.birthdate
    } = editedclient);
    const currentclientId = editedclient.id;
    const buildOptions = {isNewRecord: false, where: {id: currentclientId}};
    await this.clientModel.update(newValues, buildOptions);
    return this.getById(currentclientId);
  }

  async getById(id: number): Promise<Client> {
    const client = await this.clientModel.findOne({where: {id}});
    if (!client) {
      throw new NoResultsError();
    }
    return dbToEntity(client);
  }

  async getAll(): Promise<Client[]> {
    const clients = await this.clientModel.findAll();
    if (!clients) {
      throw new NoResultsError();
    }
    return clients.map(client => dbToEntity(client));
  }

  async delete(id: number): Promise<boolean> {
    const clientToDelete = await this.clientModel.findByPk(id);
    if (!clientToDelete) {
      throw new NoResultsError();
    }
    clientToDelete.destroy();
    return true;
  }
}
