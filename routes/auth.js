const {Router} = require("express")
const {register} = require("../controller/auth_ctr")

const authRouter = Router()

authRouter.post("/register", register)



module.exports = authRouter;
