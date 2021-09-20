const { sortCategories, sortUsers } = require(`../db/utils/data-manipulation`);

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

describe.only("#sortUsers", () => {
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
    expect(sortUsers(input)).toEqual(output)
  });
});
