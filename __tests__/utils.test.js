const {
  sortCategories,
  sortUsers,
  sortReviews,
  sortComments,
} = require(`../db/utils/data-manipulation`);

describe("#sortCategories", () => {
  test("returns 2D array of organised category values", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    const output = [["euro game", "Abstact games that involve little luck"]];
    expect(sortCategories(input)).toEqual(output);
  });
  test("should not mutate original array  ", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    const output = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    sortCategories(input);
    expect(input).toEqual(output);
  });
  test("should have diff ref from original array", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    expect(sortCategories(input)).not.toBe(input);
  });
  test("can take more than one object in input array", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
      {
        slug: "social deduction",
        description: "Players attempt to uncover each other's hidden role",
      },
    ];
    const output = [
      ["euro game", "Abstact games that involve little luck"],
      [
        "social deduction",
        "Players attempt to uncover each other's hidden role",
      ],
    ];
    expect(sortCategories(input)).toEqual(output);
  });
});

describe("#sortUsers", () => {
  test("returns 2D array of organised user values", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    const output = [
      [
        "mallionaire",
        "haz",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
    ];
    expect(sortUsers(input)).toEqual(output);
  });
  test("should not mutate original array", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    sortUsers(input);
    expect(input).toEqual([
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ]);
  });
  test("new array should have different reference", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    expect(sortUsers(input)).not.toBe(input);
  });
  test("works with multiple user objects", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "philippaclaire9",
        name: "philippa",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
    ];
    const output = [
      [
        "mallionaire",
        "haz",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
      [
        "philippaclaire9",
        "philippa",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      ],
    ];
    expect(sortUsers(input)).toEqual(output);
  });
});

describe("#sortReviews", () => {
  test("should return 2D array with only one object", () => {
    const input = [
      {
        title: "Culture a Love of Agriculture With Agricola",
        designer: "Uwe Rosenberg",
        owner: "tickle122",
        review_img_url:
          "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: "strategy",
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ];

    const output = [
      [
        "Culture a Love of Agriculture With Agricola",
        "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        "Uwe Rosenberg",
        "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        1,
        "strategy",
        "tickle122",
        new Date(1610964020514),
      ],
    ];
    expect(sortReviews(input)).toEqual(output);
  });
  test("does not mutate original array", () => {
    const input = [
      {
        title: "Culture a Love of Agriculture With Agricola",
        designer: "Uwe Rosenberg",
        owner: "tickle122",
        review_img_url:
          "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: "strategy",
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ];
    sortReviews(input);
    expect(input).toEqual([
      {
        title: "Culture a Love of Agriculture With Agricola",
        designer: "Uwe Rosenberg",
        owner: "tickle122",
        review_img_url:
          "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: "strategy",
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ]);
  });
  test("does not share reference", () => {
    const input = [
      {
        title: "Culture a Love of Agriculture With Agricola",
        designer: "Uwe Rosenberg",
        owner: "tickle122",
        review_img_url:
          "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: "strategy",
        created_at: new Date(1610964020514),
        votes: 1,
      },
    ];
    expect(sortReviews(input)).not.toBe(input);
  });
  test("should work with multiple objects", () => {
    const input = [
      {
        title: "Culture a Love of Agriculture With Agricola",
        designer: "Uwe Rosenberg",
        owner: "tickle122",
        review_img_url:
          "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        review_body:
          "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        category: "strategy",
        created_at: new Date(1610964020514),
        votes: 1,
      },
      {
        title: "JengARRGGGH!",
        designer: "Leslie Scott",
        owner: "grumpy19",
        review_img_url:
          "https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        review_body:
          "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        category: "dexterity",
        created_at: new Date(1610964101251),
        votes: 5,
      },
    ];
    const output = [
      [
        "Culture a Love of Agriculture With Agricola",
        "You could sum up Agricola with the simple phrase 'Farmyeard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
        "Uwe Rosenberg",
        "https://images.pexels.com/photos/4917821/pexels-photo-4917821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        1,
        "strategy",
        "tickle122",
        new Date(1610964020514),
      ],
      [
        "JengARRGGGH!",
        "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        "Leslie Scott",
        "https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        5,
        "dexterity",
        "grumpy19",
        new Date(1610964101251),
      ],
    ];
    expect(sortReviews(input)).toEqual(output);
  });
});

describe.only("#sortComments", () => {
  test("should create 2D array from single object", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "happyamy2016",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
    ];
    const output = [
      [
        "happyamy2016",
        2,
        16,
        new Date(1511354163389),
        "I loved this game too!",
      ],
    ];
    expect(sortComments(input)).toEqual(output);
  });
  test("no mutation of original object", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "happyamy2016",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
    ];
    sortComments(input);
    expect(input).toEqual([
      {
        body: "I loved this game too!",
        votes: 16,
        author: "happyamy2016",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
    ]);
  });
  test("different reference", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "happyamy2016",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
    ];
    expect(sortComments(input)).not.toBe(input);
  });
  test("should work full multiple objects", () => {
    const input = [
      {
        body: "I loved this game too!",
        votes: 16,
        author: "happyamy2016",
        review_id: 2,
        created_at: new Date(1511354163389),
      },
      {
        body: "My dog loved this game too!",
        votes: 3,
        author: "tickle122",
        review_id: 4,
        created_at: new Date(1610964545410),
      },
    ];
    const output = [
      [
        "happyamy2016",
        2,
        16,
        new Date(1511354163389),
        "I loved this game too!",
      ],
      ["tickle122", 4, 3, new Date(1610964545410), "My dog loved this game too!"]
    ];
    expect(sortComments(input)).toEqual(output)
  });
});
