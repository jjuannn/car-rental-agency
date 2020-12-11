const { Rental } = require("../entity/rental")

function formToEntity(rental){
    const {
        id,
        fk_car,
        fk_client,
        price_per_day,
        date_from,
        date_until,
        payment_method,
        total_price,
        is_paid
    } = rental

    return new Rental({
        id : Number(id),
        fk_car,
        fk_client,
        price_per_day,
        date_from,
        date_until,
        payment_method,
        total_price,
        is_paid
    })
}

function dbToEntity(model){
    return new Rental(model.toJSON())
}

module.exports = { formToEntity, dbToEntity }

