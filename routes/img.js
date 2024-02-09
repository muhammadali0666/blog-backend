const {Router} = require("express")
const {getImgs, createImg, deleteImg, editImg} = require("../controller/img_ctr")
const {verifyAdmin} = require("../middleware/auth_middleware")

const imgRouter = Router()

imgRouter.get("/img", getImgs)
imgRouter.post("/create_img", verifyAdmin, createImg)
imgRouter.put("/edit_img/:id", verifyAdmin, editImg)
imgRouter.delete("/delete_img/:id", verifyAdmin, deleteImg)

module.exports = imgRouter