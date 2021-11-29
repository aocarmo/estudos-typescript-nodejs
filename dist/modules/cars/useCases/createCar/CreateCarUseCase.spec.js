"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description Car",
      daily_rate: 1,
      license_plate: "454654",
      fine_amount: 1,
      brand: "gol",
      category_id: "d"
    });
    expect(car).toHaveProperty("id");
  });
  it("Should not be able to createa a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Name car",
      description: "Description Car",
      daily_rate: 1,
      license_plate: "454654",
      fine_amount: 1,
      brand: "gol",
      category_id: "d"
    });
    await expect(createCarUseCase.execute({
      name: "Name carddd",
      description: "Description Car",
      daily_rate: 1,
      license_plate: "454654",
      fine_amount: 1,
      brand: "gol",
      category_id: "d"
    })).rejects.toEqual(new _AppError.AppError("Car already exists."));
  });
  it("Should be able to create a car with available as true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car availabre",
      description: "Description Car",
      daily_rate: 1,
      license_plate: "abcd",
      fine_amount: 1,
      brand: "gol",
      category_id: "d"
    });
    expect(car.available).toBeTruthy();
  });
});