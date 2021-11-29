"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(request, response) {
    const {
      name,
      email,
      driver_license,
      password
    } = request.body;
    console.log(driver_license);

    const createUserUseCase = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license
    });
    return response.status(201).send();
  }

}

exports.CreateUserController = CreateUserController;