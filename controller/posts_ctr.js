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
const getOnePosts = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findOne({ where: { id: id } });

    return res.json(post);
  } catch (error) {
    return res.send({
      message: error.message,
    });
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
    return res.send({
      message: error.message,
    });
  }
};
const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedId = await Posts.findOne({where: {id: id}})

    if(!foundedId){
      return res.send({
        message: "post not found"
      })
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
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

module.exports = {
  getPosts,
  getOnePosts,
  createPosts,
  deletePosts,
};
