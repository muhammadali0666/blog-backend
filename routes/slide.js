const {Router} = require("express")
const {getSlides, createSlide, deleteSlide} = require("../controller/slide_ctr")

const slideRouter = Router()

slideRouter.get("/slide", getSlides)
slideRouter.post("/create_slide", createSlide)
slideRouter.delete("/delete_slide/:id", deleteSlide)

module.exports = slideRouter