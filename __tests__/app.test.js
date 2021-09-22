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


describe("GET /api/review/:review_id", () => {
  test("200: returns review by id number", () => {
    return request(app)
      .get("/api/reviews/1")
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
            created_at: "2021-01-18T00:00:00.000Z",
            votes: 1
          })
      });
  });
  test('404: returns not found when searching for a review that doesnt exist', () => {
    return request(app)
      .get("/api/reviews/118")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Review Not Found!")
      })
  });
  test('404: returns when misspelt review ', () => {
    return request(app)
      .get("/api/review/118")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found!")
      })
  });
});

describe('PATCH /api/reviews/:review_id', () => {
  test('201: patch updates vote count and returns updated review', () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: 2})
      .expect(201)
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
          created_at: "2021-01-18T00:00:00.000Z",
          votes: 3
        })
      })
  });
  test('404: returns when review_id does not exist', () => {
    return request(app)
      .patch("/api/reviews/118")
      .send({ inc_votes: 2 })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Review Not Found!")
      })
  });
  test('400: returns when vote is not a number', () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: "fish" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request")
      })
  });
  test('404: returns when misspelt review ', () => {
    return request(app)
      .patch("/api/review/1")
      .send({ inc_votes: 2 })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found!")
      })
  });
});

describe.only('GET /api/reviews', () => {
  test('200: returns all reviews', () => {
    return request(app)
      .get('/api/reviews')
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toEqual(expect.any(Array));
        expect(res.body.reviews).toHaveLength(13);
        expect(typeof res.body.reviews[0]).toEqual("object");
      })
  });
  test('404: not found, incorrectly spelt endpoint etc', () => {
    return request(app)
      .get('/api/reeviews')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found!")
      })
  });
});
