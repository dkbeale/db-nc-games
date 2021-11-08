exports.sortCategories = (catagories) => {
  return catagories.map((categoryObj) => {
    return [categoryObj.slug, categoryObj.description];
  });
};

exports.sortUsers = (users) => {
  return users.map((userObj) => {
    return [userObj.username, userObj.name, userObj.avatar_url];
  });
};

exports.sortReviews = (reviews) => {
    return reviews.map((reviewObj) => {
        return [reviewObj.title, reviewObj.review_body, reviewObj.designer, reviewObj.review_img_url, reviewObj.votes, reviewObj.category, reviewObj.owner, reviewObj.created_at]
    })
};

exports.sortComments = (comments) => {
    return comments.map((commentObj) => {
        return [commentObj.author, commentObj.review_id, commentObj.votes, commentObj.created_at, commentObj.body]
    })
}
