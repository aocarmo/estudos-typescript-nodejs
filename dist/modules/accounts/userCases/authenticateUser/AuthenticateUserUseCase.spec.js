"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

let authenticateUserUseCase;
let userRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let createUserUseCase;
describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(userRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(userRepositoryInMemory);
  });
  it("Should be able to authenticate an User", async () => {
    const user = {
      driver_license: "1234",
      name: "Alex",
      email: "user@test.com",
      password: "1234"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("Should not be able to authenticate an non existent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "alex@teste.com",
      password: "654"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect."));
  });
  it("Should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "1234",
      name: "Alex",
      email: "userd@test.com",
      password: "1234"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "1234s"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect."));
  });
});