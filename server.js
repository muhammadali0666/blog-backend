require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth")
const postRouter = require("./routes/posts")

app.use(cors())
app.use(express.json())

////////////// router
app.use(authRouter)
app.use(postRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
