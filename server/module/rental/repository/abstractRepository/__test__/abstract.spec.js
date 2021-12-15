/// <reference types="@types/jest" />

import AbstractRepository from '../abstractRepository';
import AbstractRepositoryError from '../../error/abstractRepositoryError';

test('abstractRepository cannot be instanced', () => {
  let repository;
  try {
    repository = new AbstractRepository();
  } catch (err) {
    expect(err).toBeInstanceOf(AbstractRepositoryError);
  }
  expect(repository).toBeUndefined();
});

test('abstractRepository can be extended', () => {
  const repository = class ConcreteRepository extends AbstractRepository {};
  expect(new repository()).toBeInstanceOf(AbstractRepository);
});
