const {Router} = require("express")
const {getSlides, createSlide, deleteSlide} = require("../controller/slide_ctr")
const { verifyAdmin } = require("../middleware/auth_middleware")

const slideRouter = Router()

slideRouter.get("/slide", getSlides)
slideRouter.post("/create_slide", verifyAdmin, createSlide)
slideRouter.delete("/delete_slide/:id", verifyAdmin, deleteSlide)

module.exports = slideRouter