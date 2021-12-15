import AbstractControllerError from '../../error/abstractControllerError';
import AbstractController from '../abstractController';

test('cannot instance AbstractController', () => {
  let controller;
  try {
    controller = new AbstractController();
  } catch (err) {
    expect(err).toBeInstanceOf(AbstractControllerError);
  }
  expect(controller).toBeUndefined();
});

test('abstractController can be extended', async () => {
  const controller = class ConcreteController extends AbstractController {};
  expect(new controller()).toBeInstanceOf(AbstractController);
});
