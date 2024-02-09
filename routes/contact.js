const {Router} = require("express")
const {getContacts, createContact, deleteContact, editContact} = require("../controller/contact_ctr")
const {verifyAdmin} = require("../middleware/auth_middleware")

const contactRouter = Router()

contactRouter.get("/contact", getContacts)
contactRouter.post("/create_contact", verifyAdmin, createContact)
contactRouter.put("/edit_contact/:id", verifyAdmin, editContact)
contactRouter.delete("/delete_contact/:id", verifyAdmin, deleteContact)

module.exports = contactRouter