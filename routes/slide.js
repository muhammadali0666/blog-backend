const {Router} = require("express")
const {getSlides, createSlide, deleteSlide, editSlide} = require("../controller/slide_ctr")
const { verifyAdmin } = require("../middleware/auth_middleware")

const slideRouter = Router()

slideRouter.get("/slide", getSlides)
slideRouter.post("/create_slide", verifyAdmin, createSlide)
slideRouter.put("/edit_slide/:id", verifyAdmin, editSlide)
slideRouter.delete("/delete_slide/:id", verifyAdmin, deleteSlide)

module.exports = slideRouter