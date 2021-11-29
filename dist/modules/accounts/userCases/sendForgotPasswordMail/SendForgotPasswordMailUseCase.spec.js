"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send a forgot password mail user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      // random name, email, digits (Ctrl + Shift + p)
      driver_license: "157961",
      email: "ihubo@huzle.hn",
      name: "Christine Berry",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("ihubo@huzle.hn");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send an email if user does't exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("zodik@li.kn")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("Should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      // random name, email, digits (Ctrl + Shift + p)
      driver_license: "979437",
      email: "retala@riikaliv.mk",
      name: "Ernest McCarthy",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("retala@riikaliv.mk");
    expect(generateTokenMail).toBeCalled();
  });
});