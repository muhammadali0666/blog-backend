const { Posts } = require("../model");

Posts.sync({ force: false });

const getPosts = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};
const getOnePosts = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findOne({ where: { id: id } });

    return res.json(post);
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};
const createPosts = async (req, res) => {
  try {
    const { title, text, img } = req.body;

    await Posts.create({ title: title, text: text, img: img });
    return res.status(200).send({
      message: "created post",
    });
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

const editPost = async (req, res) => {
  try {
    const { title, text, img } = req.body;
    const { id } = req.params;

    const updatedPost = await Posts.update(
      { title, text, img },
      {
        returning: true,
        plain: false,
        where: {
          id,
        },
      }
    );

    return res.send(updatedPost.filter((e) => e));
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedId = await Posts.findOne({ where: { id: id } });

    if (!foundedId) {
      return res.send({
        message: "post not found",
      });
    }

    await Posts.destroy({
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    return res.send({
      msg: "deleted post!",
    });
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

module.exports = {
  getPosts,
  getOnePosts,
  createPosts,
  editPost,
  deletePosts,
};
