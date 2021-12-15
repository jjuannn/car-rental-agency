/// <reference types="jest"/>

import AbstractRepository from '../abstractRepository';
import AbstractRepositoryError from '../../error/abstractRepositoryError';

test('AbstractRepository cannot be instanced', () => {
  let repository;
  try {
    repository = new AbstractRepository();
  } catch (err) {
    expect(err).toBeInstanceOf(AbstractRepositoryError);
  }
  expect(repository).toBeUndefined();
});

test('AbstractRepository can be extended', () => {
  const repository = class ConcreteRepository extends AbstractRepository {};
  expect(new repository()).toBeInstanceOf(AbstractRepository);
});
