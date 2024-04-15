const { Users } = require("../model");
const jwt = require("jsonwebtoken");

Users.sync({ force: false });

const authRegister = async (req, res) => {
  try {
    const { fullName, email, profilePhoto } = req.body;

    const user = await Users.findOne({ where: { email: email } });
    if (user) {
      return res.status(200).send({
        msg: "user already exists",
      });
    }

    let lower = fullName.toLowerCase();

    await Users.create({ fullName: lower, email, profilePhoto });

    return res.status(201).send({
      msg: "Registered!",
    });
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

const authLogin = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await Users.findOne({ where: { email: email } });

    let founEmail = user.email === email;

    if (!founEmail) {
      return res.status(404).send({
        msg: "You haven't register",
      });
    }

    if (founEmail) {
      let verifyAdmin =
        user.role === "admin"
          ? await jwt.sign(
              { id: user.id, email: user.email },
              process.env.SEKRET_KEY,
              {
                expiresIn: process.env.TIME,
              }
            )
          : null;
      let token = await jwt.sign(
        { id: user.id, email: user.email },
        process.env.SEKRET_KEY,
        {
          expiresIn: process.env.TIME,
        }
      );
      verifyAdmin ? verifyAdmin : !verifyAdmin;
      return res.send({
        msg: "Success",
        token,
        verifyAdmin,
      });
    } else {
      res.send({
        msg: "Name wrong",
      });
    }
  } catch (error) {
    return res.status(400).json({ error: "My custom 400 error" });
  }
};

// const authAdminLogin = async (req, res) => {
//   try {
//     const { email } = req.body;

//     let user = await Users.findOne({ where: { email: email } });

//     if (!user) {
//       return res.status(401).send({
//         msg: "user not found",
//       });
//     }

//     if (user.role !== "admin") {
//       res.send({
//         msg: "you are not admin",
//       });
//     } else {
//       res.send({
//         msg: "Welcome to admin panel ✋",
//       });
//     }
//   } catch {
//     res.send({
//       msg: "error",
//     });
//   }
// };

module.exports = {
  authRegister,
  authLogin,
  // authAdminLogin,
};
