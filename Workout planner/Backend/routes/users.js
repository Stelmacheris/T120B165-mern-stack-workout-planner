const router = require("express").Router();
let User = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");

const isValidRegister = (user) => {
  if (!validator.isEmail(user.email)) {
    return {
      toSave: false,
      message: "E-mail is not valid!",
    };
  }

  if (!validator.isLength(user.password, { min: 6, max: 24 })) {
    console.log(user.password);
    return {
      toSave: false,
      message: "Password should be between 6 and 24 characters!",
    };
  }

  if (!validator.isLength(user.username, { min: 6, max: 24 })) {
    return {
      toSave: false,
      message: "Username should be between 6 and 24 characters!",
    };
  }

  return {
    toSave: true,
    message: "User added succesfully",
  };
};

router.route("/register").post(async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  const user = new User({ username, email, password, userType });
  try {
    const usernameExist = await User.find({ username });
    const emailExist = await User.find({ email });
    if (usernameExist.length > 0) {
      res.status(400).json({ message: "Username exists!", status: 400 });
    } else if (emailExist.length > 0) {
      res.status(400).json({ message: "E-mail exists!", status: 400 });
    } else {
      const isSave = isValidRegister(user);
      if (!isSave.toSave) {
        res.status(400).json({ message: isSave.message, status: 400 });
      } else {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.status(201).json({ message: isSave.message, status: 200 });
      }
    }
  } catch (e) {
    res.status(400).json({ message: "Error", status: 400 });
  }
});

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({ username });
  if (user.length === 0) {
    res.status(400).json({ error: "User does not exist", status: 400 });
  } else {
    const dbPassword = user[0].password;
    const validPassword = await bcrypt.compare(password, dbPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Wrong login credentials!", status: 400 });
    } else {
      res.status(201).json({ message: "Login succesfully", _id: user[0]._id });
    }
  }
});

module.exports = router;
