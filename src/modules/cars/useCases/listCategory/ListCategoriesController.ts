import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    async handle(reques: Request, response: Response): Promise<Response> {
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const all = await listCategoriesUseCase.execute();
        return response.status(201).json(all);
    }
}

export { ListCategoriesController };