const { Car } = require("../entity/car")

function formToEntity(car){
    const {
        id,
        brand,
        model,
        year,
        mileage,
        color,
        hasAC,
        passengers,
        gearbox_type,
        price_per_day,
        images
    } = car

    return new Car({
        id : Number(id),
        brand,
        model,
        year,
        mileage,
        color,
        hasAC,
        passengers,
        gearbox_type,
        price_per_day,
        images
    })
}

function dbToEntity(model){
    return new Car(model.toJSON())
}

module.exports = { formToEntity, dbToEntity }