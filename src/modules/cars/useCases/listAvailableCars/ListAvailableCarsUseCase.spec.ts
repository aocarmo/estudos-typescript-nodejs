import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });
    it("Should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Carro ruim",
            daily_rate: 140.0,
            license_plate: "ply-845e4",
            fine_amount: 100.0,
            brand: "Car_brand",
            category_id: "Category id",
        });
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 2",
            description: "Carro ruim",
            daily_rate: 140.0,
            license_plate: "ply-845e4",
            fine_amount: 100.0,
            brand: "Car_brands",
            category_id: "Category id",
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brands",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 2",
            description: "Carro ruim",
            daily_rate: 140.0,
            license_plate: "ply-845e4",
            fine_amount: 100.0,
            brand: "Car_brands",
            category_id: "Category id",
        });
        const cars = await listAvailableCarsUseCase.execute({
            name: "Car 2",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car 2",
            description: "Carro ruim",
            daily_rate: 140.0,
            license_plate: "ply-845e4",
            fine_amount: 100.0,
            brand: "Car_brands",
            category_id: "123456",
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "123456",
        });

        expect(cars).toEqual([car]);
    });
});
