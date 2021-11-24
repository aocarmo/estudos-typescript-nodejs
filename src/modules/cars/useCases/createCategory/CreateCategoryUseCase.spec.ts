import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categpriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create category", () => {
    beforeEach(() => {
        categpriesRepositoryInMemory = new CategoriesRepositoryInMemory();

        createCategoryUseCase = new CreateCategoryUseCase(
            categpriesRepositoryInMemory
        );
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test",
        };
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categpriesRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category Description Test",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
