const {Router} = require("express")
const {getImgs, createImg, deleteImg} = require("../controller/img_ctr")

const imgRouter = Router()

imgRouter.get("/img", getImgs)
imgRouter.post("/create_img", createImg)
imgRouter.delete("/delete_img/:id", deleteImg)

module.exports = imgRouter