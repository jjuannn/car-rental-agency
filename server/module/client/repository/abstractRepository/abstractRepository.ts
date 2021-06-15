import AbstractRepositoryError from '../error/abstractRepositoryError';

export default class AbstractRepository {
  constructor() {
    if (new.target === AbstractRepository) {
      throw new AbstractRepositoryError();
    }
  }
}
