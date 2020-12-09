const client = require("../../entity/client");
const { dbToEntity } = require("../../mapper/mapper");
const AbstractClientRepository = require("../abstractRepository/abstractRepository")
const NoResultsError = require("../error/noResultsError")

module.exports = class ClientRepository extends AbstractClientRepository {
  constructor(clientModel) {
    super();
    this.clientModel = clientModel
  }

  /**
    * @param { client } newclient
  */
  async saveNewClient(newclient) {
    const buildOptions = { isNewRecord: true }
    const saveclient = await this.clientModel.create(newclient, buildOptions)

    const { id } = saveclient
    return this.getById(id)
  }
  /**
   * 
   * @param {client} editedclient 
   */
  async saveEditedClient(editedclient){
    const newValues = {
      name: editedclient.name,
      surname: editedclient.surname,
      doc_type: editedclient.doc_type,
      doc_num: editedclient.doc_num,
      address: editedclient.address,
      phone: editedclient.phone,
      e_mail: editedclient.e_mail,
      birthdate: editedclient.birthdate,
    } = editedclient
    
    const currentclientId = editedclient.id
    const buildOptions = { isNewRecord: false, where: { id : currentclientId}}
    await this.clientModel.update(newValues, buildOptions)

    return this.getById(currentclientId)
  }
  /**
   * 
   * @param {Number} id 
   */
  async getById(id){
    const client = await this.clientModel.findOne({ where: { id }})
    if(!client){
      throw new NoResultsError()
    }
    return dbToEntity(client)
  }
  async getAll(){
    const clients = await this.clientModel.findAll() 
    if(!clients){
      throw new NoResultsError()
    }
    return clients.map( client => dbToEntity(client))
  }
  /**
   * @param {Number} id
   */
  async delete(id){
    const clientToDelete = await this.clientModel.findByPk(id)
    if(!clientToDelete){
      throw new NoResultsError()
    }

    clientToDelete.destroy()
    return true
  }
}
