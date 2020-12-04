const AbstractRepositoryError = require("../error/abstractRepositoryError")

class AbstractRepository{
    constructor(){
        if(new.target === AbstractRepository){
            throw new AbstractRepositoryError()
        }
    }
}

module.exports = AbstractRepository
