import IClientRepository from '../interface/IClientRepository';
import {dbToEntity} from '../../mapper/mapper';
import AbstractClientRepository from '../abstractRepository/abstractRepository';
import NoResultsError from '../error/noResultsError';
import Client from '../../entity/client';
import ClientModel from '../../model/clientModel';

export default class ClientRepository
  extends AbstractClientRepository
  implements IClientRepository
{
  constructor(public clientModel: typeof ClientModel) {
    super();
  }

  async saveNewClient(newclient: Client): Promise<Client> {
    const buildOptions = {isNewRecord: true};
    const saveclient = await this.clientModel.create(newclient, buildOptions);
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
    const clients = await this.clientModel.findAll({
      order: [['id', 'DESC']]
    });

    return clients.map((client: typeof ClientModel) => dbToEntity(client));
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
