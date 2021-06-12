import AbstractRepositoryError from '../abstractRepository/abstractRepository';

export default class AbstractRepository {
  constructor() {
    if (new.target === AbstractRepository) {
      throw new AbstractRepositoryError();
    }
  }
}

module.exports = AbstractRepository;
