const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");

describe("Users Routes Test", () => {
  let u1, u2;
  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");

    u1 = await User.register({
      username: "test1",
      password: "password",
      first_name: "Test1",
      last_name: "Testy1",
      phone: "+14155550000",
    });
    u2 = await User.register({
      username: "test2",
      password: "password",
      first_name: "Test2",
      last_name: "Testy2",
      phone: "+1415550001",
    });
  });

  //***************************************** GET **

  describe("GET User tests", () => {
    test("Get All Users", async () => {
      const result = await User.all();
      expect(result).toEqual([
        {
          username: "test1",
          first_name: "Test1",
          last_name: "Testy1",
          phone: "+14155550000",
        },
        {
          username: "test2",
          first_name: "Test2",
          last_name: "Testy2",
          phone: "+1415550001",
        },
      ]);
    });
  });

  test("Get A User", async () => {
    const result = await User.get(u1.username);
    expect(result).toEqual({
      username: "test1",
      first_name: "Test1",
      last_name: "Testy1",
      phone: "+14155550000",
      join_at: expect.any(String),
      last_login_at: expect.any(String),
    });
  });
});

afterAll(async () => {
  await db.end();
});
