"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationsRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should not be able to add a new specification to a non existent car", () => {
    const car_id = "1234";
    const specifications_id = ["1234"];
    expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exists!"));
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name car",
      description: "Description Car",
      daily_rate: 1,
      license_plate: "454654",
      fine_amount: 1,
      brand: "gol",
      category_id: "d"
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "Test",
      name: "test"
    }); /// const car_id = "1234";

    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});