const {Router} = require("express")
const {getOnePosts, getPosts, createPosts, deletePosts} = require("../controller/posts_ctr")

const postRouter = Router()

postRouter.get("/posts", getPosts)
postRouter.get("/post_one/:id", getOnePosts)
postRouter.post("/create_post", createPosts)
postRouter.delete("/delete_posts", deletePosts)

module.exports = postRouter