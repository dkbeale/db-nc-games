const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/categories ", () => {
  test("200: returns array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        console.log(res.body.categories)
        expect(res.body.categories).toEqual(expect.any(Array));
        expect(res.body.categories).toHaveLength(4);
        expect(typeof res.body.categories[0]).toEqual("object");
      });
  });
  test("404: Not Found, misspelt categories", () => {
    return request(app)
      .get("/api/cetegories")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found!");
      });
  });
});
// res.statusCode, res.statusMessage

describe.only("GET /api/review/:review_id", () => {
  test("200 returns review by id number", () => {
    return request(app)
      .get("/api/review/1")
      .expect(200)
      .then((res) => {
          expect(res.body.review).toEqual({
            review_id : 1,
            title: 'Agricola',
            designer: 'Uwe Rosenberg',
            owner: 'mallionaire',
            review_img_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            review_body: 'Farmyard fun!',
            category: 'euro game',
            created_at: new Date(1610964020514),
            votes: 1
          })
      });
  });
});
