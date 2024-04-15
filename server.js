require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts")
const slideRouter = require("./routes/slide")
const imgRouter = require("./routes/img")
const contactRouter = require("./routes/contact")
const severless = require("serverless-http")

app.use(cors())
app.use(express.json())

////////////// router
app.use(authRouter)
app.use(postRouter)
app.use(slideRouter)
app.use(imgRouter)
app.use(contactRouter)

const router = express.Router()

router.get("/", (req, res) => {
  res.json({
    "hello world": "salom"
  })
})

app.use(router)

module.exports.handler = severless(app)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
