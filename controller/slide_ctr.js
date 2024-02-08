const { Slides } = require("../model");

Slides.sync({ force: false });

const getSlides = async (_, res) => {
  const posts = await Slides.findAll();
  return res.json(posts);
};
const createSlide = async (req, res) => {
  try {
    const { img } = req.body;

    if(!img) {
      return res.send({
        message: "slide not found"
      })
    }

    await Slides.create({img: img });

    return res.status(200).send({
      message: "created slide",
    });
  } catch (error) {
    return res.send({
      message: error.message,
    });
  }
};
const deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedId = await Slides.findOne({ where: { id: id } });

    if (!foundedId) {
      return res.send({
        message: "slide not found",
      });
    }

    await Slides.destroy({
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    return res.send({
      msg: "deleted slide!",
    });
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

module.exports = {
  getSlides,
  createSlide,
  deleteSlide
};
