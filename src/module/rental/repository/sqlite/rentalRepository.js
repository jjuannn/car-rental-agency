const { dbToEntity } = require("../../mapper/mapper");
const AbstractClientRepository = require("../abstractRepository/abstractRepository")
const NoResultsError = require("../error/noResultsError")
const { Rental } = require("../../entity/rental")

module.exports = class ClientRepository extends AbstractClientRepository {
  constructor(rentalModel, clientModel, carModel) {
    super();
    this.rentalModel = rentalModel
    this.clientModel = clientModel
    this.carModel = carModel
  }

  /**
    * @param { Rental } newRental
  */
  async saveNewRental(newRental) {
    const buildOptions = { isNewRecord: true }
    const saveRental = await this.rentalModel.create(newRental, buildOptions)

    const { id } = saveRental
    return this.getById(id)
  }
  /**
   * 
   * @param {Rental} editedRental 
   */
  async saveEditedRental(editedRental){
    const newValues = {
      date_from: editedRental.date_from,
      date_until: editedRental.date_until,
      price_per_day: editedRental.price_per_day,
      total_price: editedRental.total_price,
      payment_method: editedRental.payment_method,
      is_paid: editedRental.is_paid,
      fk_car: editedRental.fk_car,
      fk_client: editedRental.fk_client
    } = editedRental
    
    const currentRentalId = editedRental.id
    const buildOptions = { isNewRecord: false, where: { id : currentRentalId}}
    await this.rentalModel.update(newValues, buildOptions)

    return this.getById(currentRentalId)
  }
  /**
   * 
   * @param {Number} id 
   */
  async getById(id){
    const rental = await this.rentalModel.findOne({ where: { id }, include: [this.carModel, this.clientModel]})
    if(!rental){
      throw new NoResultsError()
    }
    return dbToEntity(rental)
  }
  async getAll(){
    const rentals = await this.rentalModel.findAll({ include: [this.carModel, this.clientModel]})
    if(!rentals){
      throw new NoResultsError()
    }
    return rentals.map( rental => dbToEntity(rental))
  }
  /**
   * @param {Number} id
   */
  async delete(id){
    const rentalToDelete = await this.rentalModel.findByPk(id)
    if(!rentalToDelete){
      throw new NoResultsError()
    }

    rentalToDelete.destroy()
    return true
  }
}
