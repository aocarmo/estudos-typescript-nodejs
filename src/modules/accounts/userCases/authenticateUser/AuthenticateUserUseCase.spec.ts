import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            userRepositoryInMemory
        );

        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("Should be able to authenticate an User", async () => {
        const user: ICreateUsersDTO = {
            driver_license: "1234",
            name: "Alex",
            email: "user@test.com",
            password: "1234",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate an non existent user", async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: "alex@teste.com",
                password: "654",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect."));
    });

    it("Should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUsersDTO = {
            driver_license: "1234",
            name: "Alex",
            email: "userd@test.com",
            password: "1234",
        };

        await createUserUseCase.execute(user);
        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "1234s",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect."));
    });
});
