const { Posts } = require("../model");

Posts.sync({ force: false });

const getPosts = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const posts = await Posts.findAll();

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < posts.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit,
    };
  }
  results.results = posts.slice(startIndex, endIndex);
  return res.json(results);
};
const getOnePosts = () => {};
const createPosts = async (req, res) => {
  try {
    const { title, text, img } = req.body;

      await Posts.create({title:title, text:text, img:img});
      return res.status(200).send({
        message: "created post",
      });
  } catch (error) {
    return res.send({
      message: error.message,
    });
  }
};
const deletePosts = () => {};

module.exports = {
  getPosts,
  getOnePosts,
  createPosts,
  deletePosts,
};
