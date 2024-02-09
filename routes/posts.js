const {Router} = require("express")
const {getOnePosts, getPosts, createPosts, deletePosts, editPost} = require("../controller/posts_ctr")
const { verifyAdmin } = require("../middleware/auth_middleware")

const postRouter = Router()

postRouter.get("/posts", getPosts)
postRouter.get("/post_one/:id", getOnePosts)
postRouter.post("/create_post", verifyAdmin, createPosts)
postRouter.put("/edit_post/:id", verifyAdmin, editPost)
postRouter.delete("/delete_post/:id", verifyAdmin, deletePosts)

module.exports = postRouter