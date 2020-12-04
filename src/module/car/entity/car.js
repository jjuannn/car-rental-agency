class Car{
    constructor({
        id, brand, model, year, mileage, color, hasAC, passengers, gearbox_type, images
    }){
        this.id = id
        this.brand = brand
        this.model = model
        this.year = year
        this.mileage = mileage
        this.color = color
        this.hasAC = hasAC
        this.passengers = passengers
        this.gearbox_type = gearbox_type
        this.images = images
    }
}

module.exports = { Car }