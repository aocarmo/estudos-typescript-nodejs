import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, driver_license, password } = request.body;
        console.log(driver_license);

        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute({
            name,
            password,
            email,
            driver_license,
        });

        return response.status(201).send();
    }
}

export { CreateUserController };
