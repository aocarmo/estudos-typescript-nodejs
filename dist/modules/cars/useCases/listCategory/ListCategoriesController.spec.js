"use strict";

var _bcryptjs = require("bcryptjs");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("@shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
let adminToken;
describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'XXXXXXXXX')
        `);
    const {
      body
    } = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin"
    });
    adminToken = body.refresh_token;
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to list all categories", async () => {
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Automated windows",
      description: "Windows rolls down or up with a click of a button!"
    }).set({
      Authorization: `Bearer ${adminToken}`
    });
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Four doors",
      description: "Cars have four doors!"
    }).set({
      Authorization: `Bearer ${adminToken}`
    });
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Manual shift",
      description: "Manual shift for more control of the car!"
    }).set({
      Authorization: `Bearer ${adminToken}`
    });
    const response = await (0, _supertest.default)(_app.app).get("/categories");
    expect(response.status).toBe(201); // expect(response.body.length).toBe(3);
  });
});