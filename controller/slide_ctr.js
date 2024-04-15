const { Slides } = require("../model");

Slides.sync({ force: false });

const getSlides = async (_, res) => {
  try {
    const posts = await Slides.findAll();
    return res.json(posts);
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};
const createSlide = async (req, res) => {
  try {
    const { img } = req.body;

    if (!img) {
      return res.send({
        message: "slide not found",
      });
    }

    await Slides.create({ img: img });

    return res.status(200).send({
      message: "created slide",
    });
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

const editSlide = async (req, res) => {
  try {
    const { img } = req.body;
    const { id } = req.params;

    const updatedImg = await Slides.update(
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
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

module.exports = {
  getSlides,
  createSlide,
  editSlide,
  deleteSlide,
};
