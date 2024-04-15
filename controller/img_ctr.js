const { Imgs } = require("../model");

Imgs.sync({ force: false });

const getImgs = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

const createImg = async (req, res) => {
  try {
    const { img } = req.body;

    await Imgs.create({ img: img });
    return res.status(200).send({
      message: "created img",
    });
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

const editImg = async (req, res) => {
  try {
    const { img } = req.body;
    const { id } = req.params;

    const updatedImg = await Imgs.update(
      { img },
      {
        returning: true,
        plain: false,
        where: {
          id,
        },
      }
    );

    return res.send(updatedImg.filter((e) => e));
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

const deleteImg = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedId = await Imgs.findOne({ where: { id: id } });

    if (!foundedId) {
      return res.send({
        message: "img not found",
      });
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
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

module.exports = {
  getImgs,
  createImg,
  editImg,
  deleteImg,
};
