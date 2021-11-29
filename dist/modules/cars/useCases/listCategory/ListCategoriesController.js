"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesController = void 0;

var _tsyringe = require("tsyringe");

var _ListCategoriesUseCase = require("./ListCategoriesUseCase");

class ListCategoriesController {
  async handle(reques, response) {
    const listCategoriesUseCase = _tsyringe.container.resolve(_ListCategoriesUseCase.ListCategoriesUseCase);

    const all = await listCategoriesUseCase.execute();
    return response.status(201).json(all);
  }

}

exports.ListCategoriesController = ListCategoriesController;