require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts")
const slideRouter = require("./routes/slide")
const imgRouter = require("./routes/img")

app.use(cors())
app.use(express.json())

////////////// router
app.use(authRouter)
app.use(postRouter)
app.use(slideRouter)
app.use(imgRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
