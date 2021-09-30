const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const { get } = require("superagent");
const { endpoints } = require("../endpoints");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe.only("GET /api/categories ", () => {
  test.only("200: returns array of category objects", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.categories)).toBe(true);
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

describe("GET /api/reviews/:review_id", () => {
  test("200: returns review by id number", () => {
    return request(app)
      .get("/api/reviews/2")
      .expect(200)
      .then((res) => {
        expect(res.body.review).toEqual({
          review_id: 2,
          title: "Jenga",
          designer: "Leslie Scott",
          owner: "philippaclaire9",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Fiddly fun for all the family",
          category: "dexterity",
          created_at: "2021-01-18T00:00:00.000Z",
          votes: 5,
          comment_count: 3,
        });
      });
  });
  test("404: returns not found when searching for a review that doesnt exist", () => {
    return request(app)
      .get("/api/reviews/118")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Review Not Found!");
      });
  });
  test("404: returns when misspelt review ", () => {
    return request(app)
      .get("/api/review/1")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found!");
      });
  });
  test("400: returns when invalid ID", () => {
    return request(app)
      .get("/api/reviews/dog")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request - Not an ID");
      });
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("201: patch updates vote count and returns updated review", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: 2 })
      .expect(201)
      .then((res) => {
        expect(res.body.review).toEqual({
          review_id: 1,
          title: "Agricola",
          designer: "Uwe Rosenberg",
          owner: "mallionaire",
          review_img_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
          review_body: "Farmyard fun!",
          category: "euro game",
          created_at: "2021-01-18T00:00:00.000Z",
          votes: 3,
        });
      });
  });
  test("404: returns when review_id does not exist", () => {
    return request(app)
      .patch("/api/reviews/118")
      .send({ inc_votes: 2 })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Review Not Found!");
      });
  });
  test("400: returns when vote is not a number", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: "fish" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid ID or Vote");
      });
  });
  test("404: returns when misspelt endpoint ", () => {
    return request(app)
      .patch("/api/review/1")
      .send({ inc_votes: 2 })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found!");
      });
  });
  test("400: Invalid ID", () => {
    return request(app)
      .patch("/api/reviews/fish")
      .send({ inc_votes: 2 })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid ID or Vote");
      });
  });
});

describe("GET /api/reviews", () => {
  test("200: returns all reviews when passed no queries", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toEqual(expect.any(Array));
        expect(res.body.reviews).toHaveLength(13);
        expect(typeof res.body.reviews[0]).toEqual("object");
        expect(res.body.reviews[6]).toMatchObject({
          owner: expect.any(String),
          title: expect.any(String),
          review_id: expect.any(Number),
          category: expect.any(String),
          review_img_url: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String),
        });
      });
  });
  test("404: not found, incorrectly spelt endpoint etc", () => {
    return request(app)
      .get("/api/reeviews")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found!");
      });
  });
  test("200: default returns list of reviews in DESC order by date", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
      });
  });
  test("200: sorts DESC by chosen column value", () => {
    return request(app)
      .get("/api/reviews?sort_by=owner")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toBeSortedBy("owner", { descending: true });
      });
  });
  test("200: sorts in chosen order", () => {
    return request(app)
      .get("/api/reviews?sort_by=owner&order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toBeSortedBy("owner");
      });
  });
  test("200: sorts by category value", () => {
    return request(app)
      .get("/api/reviews?category=social_deduction")
      .expect(200)
      .then((res) => {
        expect(res.body.reviews).toHaveLength(11);
        expect(res.body.reviews[0]).toEqual({
          review_id: 7,
          title: "Mollit elit qui incididunt veniam occaecat cupidatat",
          designer: "Avery Wunzboogerz",
          owner: "mallionaire",
          review_img_url:
            "https://images.pexels.com/photos/278888/pexels-photo-278888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          review_body:
            "Consectetur incididunt aliquip sunt officia. Magna ex nulla consectetur laboris incididunt ea non qui. Enim id eiusmod irure dolor ipsum in tempor consequat amet ullamco. Occaecat fugiat sint fugiat mollit consequat pariatur consequat non exercitation dolore. Labore occaecat in magna commodo anim enim eiusmod eu pariatur ad duis magna. Voluptate ad et dolore ullamco anim sunt do. Qui exercitation tempor in in minim ullamco fugiat ipsum. Duis irure voluptate cupidatat do id mollit veniam culpa. Velit deserunt exercitation amet laborum nostrud dolore in occaecat minim amet nostrud sunt in. Veniam ut aliqua incididunt commodo sint in anim duis id commodo voluptate sit quis.",
          category: "social deduction",
          created_at: "2021-01-25T00:00:00.000Z",
          votes: 9,
          comment_count: "0"
        });
      });
  });
  test('400: invalid sort_by query', () => {
    return request(app)
      .get('/api/reviews?sort_by=fish')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Sort By Query")
      })
  });
  test('400: invalid order query', () => {
    return request(app)
      .get('/api/reviews?order=fish')
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Order Query")
      })
  });
  test('404: invalid category', () => {
    return request(app)
      .get('/api/reviews?category=fish')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Category Does Not Exist")
      })
  });
  test('200: valid category, no results', () => {
    return request(app)
      .get("/api/reviews?category=children's_games")
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe("Valid Category - No Reviews")
      })
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("200: returns all comments by review_id", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments).toHaveLength(3);
        expect(Array.isArray(res.body.comments)).toBe(true);
        res.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            author: expect.any(String),
            review_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });
  test("404: returns 404 when review_id doesnt exist", () => {
    return request(app)
      .get("/api/reviews/118/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Review Not Found Or No Comments!");
      });
  });
  test("400: if review param is not a number", () => {
    return request(app)
      .get("/api/reviews/fish/comments")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request");
      });
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("201: returns posted comment", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "philippaclaire9", body: "I love this game!" })
      .expect(201)
      .then((res) => {
        expect(res.body.comment).toMatchObject({
          comment_id: expect.any(Number),
          author: expect.any(String),
          review_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          body: expect.any(String),
        });
      });
  });
  test("404: bad request, trying to post when review_id doesnt exist", () => {
    return request(app)
      .post("/api/reviews/14/comments")
      .send({ username: "philippaclaire9", body: "I love this game!" })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Review Not Found");
      });
  });
  test("404: bad request, username does not exist", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({ username: "dan", body: "I love this game!" })
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("User Not Found");
      });
  });
  test("400: missing required fields", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Missing required field");
      });
  });
  test("400: Invalid reviewID", () => {
    return request(app)
      .post("/api/reviews/apple/comments")
      .send({ username: "philippaclaire9", body: "I love this game!" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid ID");
      });
  });
  test("201: creates comment, ignoring extra properties", () => {
    return request(app)
      .post("/api/reviews/1/comments")
      .send({
        username: "philippaclaire9",
        face: "Hullo There",
        body: "I love this game!",
      })
      .expect(201)
      .then((res) => {
        expect(res.body.comment).toMatchObject({
          comment_id: expect.any(Number),
          author: expect.any(String),
          review_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          body: expect.any(String),
        });
      });
  });
});

describe("GET /api/", () => {
  test("200: responds with a JSON object of the endpoints", () => {
    return request(app)
      .get(`/api`)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(endpoints);
      });
  });
  test("404: page not found", () => {
    return request(app)
      .get("/apo")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found!");
      });
  });
});

describe("GET /", () => {
  test("200: returns welcome message", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.body.welcome).toBe(
          "Welcome to my API! Enter https://db-nc-games.herokuapp.com/api/ for URL endpoints"
        );
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: should delete comment and returns no content", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("404: non existent ID e.g. 2000", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Comment does not exist");
      });
  });
  test('400: invalid ID e.g. "not-an-id', () => {
    return request(app)
      .delete("/api/comments/fish")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad Request - Not an ID");
      });
  });
});
