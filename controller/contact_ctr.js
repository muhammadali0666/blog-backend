const { Contacts } = require("../model");

Contacts.sync({ force: false });

const getContacts = async (req, res) => { 
  const contacts = await Contacts.findAll();
  return res.json(contacts);
};

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    await Contacts.create({ name, email, subject, message });
    return res.status(200).send({
      message: "created contact",
    });
  } catch (error) {
    return res.send({
      message: error.message,
    });
  }
};
const editContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const { id } = req.params;

    const updatedContact = await Contacts.update(
      { name, email, subject, message },
      {
        returning: true,
        plain: false,
        where: {
          id,
        },
      }
    );

    return res.send(updatedContact.filter((e) => e));
  } catch (error) {
    return res.send({
      message: error.message,
    });
  }
};
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedId = await Contacts.findOne({ where: { id: id } });

    if (!foundedId) {
      return res.send({
        message: "contact not found",
      });
    }

    await Contacts.destroy({
      returning: true,
      plain: true,
      where: {
        id,
      },
    });
    return res.send({
      msg: "deleted contact!",
    });
  } catch (err) {
    return res.send({
      msg: err.message,
    });
  }
};

module.exports = {
  getContacts,
  createContact,
  editContact,
  deleteContact,
};
