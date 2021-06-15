import AbstractControllerError from '../error/abstractControllerError';

export default class AbstractController {
  constructor() {
    if (new.target === AbstractController) {
      throw new AbstractControllerError();
    }
  }
}
