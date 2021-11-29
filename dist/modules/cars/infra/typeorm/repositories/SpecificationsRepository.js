"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepository = void 0;

var _typeorm = require("typeorm");

var _Specification = require("../entities/Specification");

class SpecificationsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Specification.Specification);
  }

  async findByIds(ids) {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

  async create({
    name,
    description
  }) {
    const specification = this.repository.create({
      description,
      name
    });
    await this.repository.save(specification);
    return specification; // this.specifications.push(specification);
  }

  async list() {
    const specifications = await this.repository.find();
    return specifications;
  }

  async findByName(name) {
    const specification = await this.repository.findOne({
      name
    });
    return specification;
  }

}

exports.SpecificationsRepository = SpecificationsRepository;