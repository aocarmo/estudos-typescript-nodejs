"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;

var _Specification = require("@modules/cars/infra/typeorm/entities/Specification");

class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async findByName(name) {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }

  async findByIds(ids) {
    const allSpecifications = this.specifications.filter(specification => ids.includes(specification.id));
    return allSpecifications;
  }

  async list() {
    return this.specifications;
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      description,
      name
    });
    this.specifications.push(specification);
    return specification;
  }

}

exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;