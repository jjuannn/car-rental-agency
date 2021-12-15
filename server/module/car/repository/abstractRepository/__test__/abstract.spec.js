import AbstractRepositoryError from '../../error/abstractRepositoryError';
import AbstractRepository from '../abstractRepository';

test('cannot instance AbstractRepository', () => {
  let repository;
  try {
    repository = new AbstractRepository();
  } catch (err) {
    expect(err).toBeInstanceOf(AbstractRepositoryError);
  }
  expect(repository).toBeUndefined();
});

test('AbstractRepository can be extended', () => {
  let repository = class ConcreteRepository extends AbstractRepository {};
  expect(new repository()).toBeInstanceOf(AbstractRepository);
});
