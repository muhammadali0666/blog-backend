const {Router} = require("express")
const {getContacts, createContact, deleteContact} = require("../controller/contact_ctr")

const contactRouter = Router()

contactRouter.get("/contact", getContacts)
contactRouter.post("/create_contact", createContact)
contactRouter.delete("/delete_contact/:id", deleteContact)

module.exports = contactRouter