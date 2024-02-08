const {Router} = require("express")
const {getImgs, createImg, deleteImg} = require("../controller/img_ctr")

const imgRouter = Router()

imgRouter.get("/posts", getImgs)
imgRouter.post("/create_post", createImg)
imgRouter.delete("/delete_post/:id", deleteImg)

module.exports = imgRouter