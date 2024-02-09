const {Router} = require("express")
const {getContacts, createContact, deleteContact} = require("../controller/contact_ctr")
const {verifyAdmin} = require("../middleware/auth_middleware")

const contactRouter = Router()

contactRouter.get("/contact", getContacts)
contactRouter.post("/create_contact", verifyAdmin, createContact)
contactRouter.delete("/delete_contact/:id", verifyAdmin, deleteContact)

module.exports = contactRouter