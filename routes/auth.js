const {Router} = require("express")
const {authLogin, authRegister} = require("../controller/auth_ctr")

const authRouter = Router()

authRouter.post("/register", authRegister)
authRouter.post("/login", authLogin)



module.exports = authRouter;
