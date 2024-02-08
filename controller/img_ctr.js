const { Imgs } = require("../model");

Imgs.sync({ force: false });

const getImgs = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const imgs = await Imgs.findAll();

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < imgs.length) {
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
  results.results = imgs.slice(startIndex, endIndex);
  return res.json(results);
};

const createImg = async (req, res) => {
  try {
    const { img } = req.body;

    await Imgs.create({ img: img });
    return res.status(200).send({
      message: "created img",
    });
  } catch (error) {
    return res.send({
      message: error.message,
    });
  }
};
const deleteImg = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedId = await Imgs.findOne({where: {id: id}})

    if(!foundedId){
      return res.send({
        message: "post not found"
      })
    }

    await Imgs.destroy({
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    return res.send({
      msg: "deleted img!",
    });
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

module.exports = {
  getImgs,
  createImg,
  deleteImg
};