const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");

describe("Users Routes Test", () => {
  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");

    await User.register({
      username: "test1",
      password: "password",
      first_name: "Test1",
      last_name: "Testy1",
      phone: "+14155550000",
    });
    await User.register({
      username: "test2",
      password: "password",
      first_name: "Test2",
      last_name: "Testy2",
      phone: "+1415550001",
    });
  });

  //***************************************** GET **

  describe("Get User tests", () => {
    test("Get All Users", async () => {
      const result = await User.all();
      expect(result).toEqual([
        {
          username: "test1",
          password: "password",
          first_name: "Test1",
          last_name: "Testy1",
          phone: "+14155550000",
        },
        {
          username: "test2",
          password: "password",
          first_name: "Test2",
          last_name: "Testy2",
          phone: "+1415550001",
        },
      ]);
    });
  });
});

afterAll(async () => {
  await db.end();
});
