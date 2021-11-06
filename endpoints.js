exports.endpoints = {
  "GET /api": {
    description:
      "serves up a json representation of all the available endpoints of the api",
  },
  "GET /api/categories": {
    description: "serves an array of all categories",
    queries: [],
    exampleResponse: {
      categories: [
        {
          description: "Players attempt to uncover each other's hidden role",
          slug: "Social deduction",
        },
      ],
    },
  },
  "GET /api/reviews": {
    description: "serves an array of all reviews",
    queries: ["category", "sort_by", "order", "search"],
    exampleResponse: {
      reviews: [
        {
          title: "One Night Ultimate Werewolf",
          designer: "Akihisa Okui",
          owner: "happyamy2016",
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          category: "hidden-roles",
          created_at: 1610964101251,
          votes: 5,
        },
      ],
    },
  },
  "GET /api/reviews/:review_id": {
    description: "serves a single review by id",
    exampleResponse: {
      review_id: 1,
      title: "Agricola",
      designer: "Uwe Rosenberg",
      owner: "mallionaire",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      review_body: "Farmyard fun!",
      category: "euro game",
      created_at: "2021-01-18T00:00:00.000Z",
      votes: 1,
    },
  },
  "PATCH /api/reviews/:review_id": {
    description:
      "change the votes on a single review and serves that changed review back",
    exampleBody: { inc_votes: 1 },
    exampleResponse: {
      review_id: 1,
      title: "Agricola",
      designer: "Uwe Rosenberg",
      owner: "mallionaire",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      review_body: "Farmyard fun!",
      category: "euro game",
      created_at: "2021-01-18T00:00:00.000Z",
      votes: 2,
    },
  },
  "GET /api/reviews/:review_id/comments": {
    description: "serves all the comments attached to a chosen review_id",
    exampleResponse: {
      comment_id: 2,
      body: "I loved this game too!",
      votes: 16,
      author: "bainesface",
      review_id: 2,
      created_at: "2021-01-18T00:00:00.000Z",
    },
  },
  "POST /api/reviews/:review_id/comments" : {
      description: "posts a brand new comment to a specified review",
      exampleBody: {
          username: "philippaclaire9",
          body: "I love this game"
      },
      exampleResponse: {
          comment_id: 7,
          author: "philippaclaire9",
          review_id: 5,
          votes: 0,
          created_at: "2021-01-18T00:00:00.000Z",
          body: "I love this game"
      }
  },
  "DELETE /api/comments/:comment_id" : {
    description: "deletes a comment by comment id",
    exampleBody: "No body",
    exampleResponse: "No Response"
  },
  "GET /api/users" : {
    description: "gets a basic array of users containing only their username",
    exampleBody: "No Body",
    exampleResponse: {
      users: [
        { username: "a username" },
        { username: "another username" },
        { username: "a third user" }
      ]
    }
  },
  "GET /api/users/:username" : {
    description: "gets a single user and their details",
    exampleBody: "No Body",
    exampleResponse: {
      username: "username",
      name: "users actual name",
      avatar_url: "url for the users avatar"
    }
  },
  "POST /api/users" : {
    description: "add a new user to the user list",
    exampleBody: {
      username: "a username",
      name: "users actual name",
      avatar_url: "url for the users chosen avatar"
    },
    exampleResponse: {
      username: "a username",
      name: "users actual name",
      avatar_url: "url for the users chosen avatar"
    }
  },
  "PATCH /api/comments/:comment_id" : {
    description: "increase/decrease comment votes, only plus or minus, returns comment with changed vote",
    exampleBody: {
      inc_vote: -1
    },
    exampleResponse: {
      comment_id: 7,
          author: "philippaclaire9",
          review_id: 5,
          votes: 5,
          created_at: "2021-01-18T00:00:00.000Z",
          body: "I love this game"
    }
  },
  "POST /api/categories" : {
    description: "add a new category to the categories list",
    exampleBody: {
      slug: "action",
      description: "A white-knuckle ride"
    },
    exampleResponse: {
      slug: "action",
      description: "A white-knuckle ride"
    }
  },
  "POST /api/reviews" : {
    description: "creates a brand new review",
    exampleBody: {
      title: "test review",
      designer: "test designer",
      owner: "user who wrote the review, references username from users",
      review_body: "The main body of the review",
      category: "references slug from categories table, returns 404 if category does not exist"
    },
    exampleResponse: {
      review_id: 1,
      title: "test review",
      designer: "test designer",
      owner: "user who wrote the review, references username from users",
      review_img_url:
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
      review_body: "The main body of the review",
      category: "references slug from categories table, returns 404 if category does not exist",
      created_at: "2021-01-18T00:00:00.000Z",
      votes: 0,
    }
  },
  "GET /api/users/:username/reviews" : {
    description: "gets all reviews written by a single user",
    exampleBody: "no body",
    exampleResponse: [
      {
        review_id: 1,
      title: "Agricola",
      designer: "Uwe Rosenberg",
      owner: "mallionaire",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      review_body: "Farmyard fun!",
      category: "euro game",
      created_at: "2021-01-18T00:00:00.000Z",
      votes: 1,
      },
    ]
  },
  "DELETE /api/reviews/:review_id" : {
    description: "removes review by review_id",
    exampleBody: "no body",
    exampleResponse: "no response"
  },
  "PATCH: /api/reviews/:review_id/body" : {
    description: "replaces current review body text and returns updated review",
    exampleBody: {
      review_body: "This game is amazing!"
    },
    exampleResponse: {
      review_id: 1,
      title: "Agricola",
      designer: "Uwe Rosenberg",
      owner: "mallionaire",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      review_body: "This game is amazing!",
      category: "euro game",
      created_at: "2021-01-18T00:00:00.000Z",
      votes: 1,
    }
  } 
};
