const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const { createToken } = require("../helper/createToken");

describe("Users Routes Test", () => {
  let u1, u2;
  let testUserToken;
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

    // Generate a token for the test user
    testUserToken = createToken(u1.username);
  });

  //***************************************** GET **

  describe("GET /users", () => {
    test("should return a list of all users", async () => {
      console.log("Generated Test Token:", testUserToken);
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${testUserToken}`);

      console.log("Response Status Code:", response.statusCode);
      console.log("Response Body:", response.body);

      expect(response.statusCode).toBe(200);
      expect(response.body.users).toBeInstanceOf(Array);
      expect(response.body.users).toContainEqual(
        expect.objectContaining({
          username: "test1",
          first_name: "Test1",
          lastname: "Testy1",
        })
      );
    });
  });
});

afterAll(async () => {
  await db.end();
});
