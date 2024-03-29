const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const { generateToken } = require("../utils/generateToken");

exports.register = (req, res) => {
  const { email, admin } = req.body;
  const password = "" + req.body.password;
  const passwordConfirm = "" + req.body.passwordConfirm;
  if (email == null || password == null) {
    res.json({ message: "Missing username or password" });
  }
  User.findOne({
    where: { email: email },
  }).then((userFound) => {
    if (!userFound) {
      console.log(password.toString() + " " + passwordConfirm.toString());
      if (password.localeCompare(passwordConfirm) == 0) {
        bcrypt.hash(password, 12, (error, passwordCrypted) => {
          User.create({
            email: email,
            password: passwordCrypted,
            admin: admin,
          })
            .then((newUser) => {
              res.json({ userID: newUser.id, message: "User Created!" });
            })
            .catch((err) => {
              res.json({
                message: "Something's wrong,Please contact an administrator",
              });
            });
        });
      } else {
        res.json({ message: "Password doesn't match" });
      }
    } else {
      res.json({ message: "User already exist" });
    }
  });
};
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    res.status(404).json({ message: "Missing username or password" });
  }
  User.findOne({
    where: { email: email },
  })
    .then((userFound) => {
      if (userFound) {
        bcrypt
          .compare(password, userFound.password)
          .then((valid) => {
            if (valid) {
              res.status(200).json({
                message: "Connected Successffuly",
                userID: userFound.id,
                admin: userFound.admin,
                token: generateToken(userFound),
              });
            } else {
              res.status(401).json({ message: "Password incorrect" });
            }
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      } else {
        res.status(401).json({ message: "Email not found" });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
