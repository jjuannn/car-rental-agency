const car = require("../../entity/car");
const { dbToEntity } = require("../../mapper/mapper");
const AbstractCarRepository = require("../abstractRepository/abstractRepository")

module.exports = class CarRepository extends AbstractCarRepository {
  constructor(carModel) {
    super();
    this.carModel = carModel
  }

  /**
    * @param { Car } newCar
  */
  async saveNewCar(newCar) {
    const buildOptions = { isNewRecord: true }
    const saveCar = await this.carModel.create(newCar, buildOptions)
  }
  /**
   * 
   * @param {Car} editedCar 
   */
  async saveEditedCar(editedCar){

    const newValues = {
      brand: editedCar.brand,
      model: editedCar.model,
      year: editedCar.year,
      mileage: editedCar.mileage,
      color: editedCar.color,
      hasAC: editedCar.hasAC,
      passengers: editedCar.passengers,
      gearbox_type: editedCar.gearbox_type,
    } = editedCar

    if(editedCar.images){
      newValues.images = editedCar.images
    }

    const currentCarId = editedCar.id
    const buildOptions = { isNewRecord: false, where: { id : currentCarId}}
    await this.carModel.update(newValues, buildOptions)

    return this.getById(currentCarId)
  }
  /**
   * 
   * @param {Number} id 
   */
  async getById(id){
    const car = await this.carModel.findOne({ where: { id }})
    return dbToEntity(car)
  }
  async getAll(){
    const cars = await this.carModel.findAll() 
    return cars.map( car => dbToEntity(car))
  }
  /**
   * @param {Number} id
   */
  async delete(id){
    const carToDelete = await this.carModel.findByPk(id)
    carToDelete.destroy()
  
    return true
  }
}
