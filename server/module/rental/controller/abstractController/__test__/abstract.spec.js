/// <reference types="@types/jest" />

import AbstractController from '../abstractController';
import AbstractControllerError from '../../error/abstractControllerError';

test('abstractController cannot be instanced', () => {
  let controller;
  try {
    controller = new AbstractController();
  } catch (err) {
    expect(err).toBeInstanceOf(AbstractControllerError);
  }
  expect(controller).toBeUndefined();
});

test('abstractController can be extended', () => {
  const controller = class ConcreteController extends AbstractController {};
  expect(new controller()).toBeInstanceOf(AbstractController);
});
