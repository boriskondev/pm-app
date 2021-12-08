const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUNDS);
const secret = process.env.SECRET;

const register = async (req, res) => {
  try {
    const { username, department, email, password, repeatPassword } = req.body;

    // Validation
    if (!username || !department || !email || !password) {
      return res.status(400).send();
    }

    if (password !== repeatPassword) {
      return res.status(418).send();
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(406).send();
    }

    // Hashing
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      department,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Sign the token
    const token = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
      },
      secret
    );

    // Send to token in HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send();
    }

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).send();
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordCorrect) {
      return res.status(401).send();
    }

    // Sign the token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.username,
      },
      secret
    );

    // Send to token in HTTP-only cookie
    // res.cookie("token", token, {
    //     httpOnly: true,
    // }).send();

    res
      .cookie("token", token, {
        sameSite: "none",
        secure: true,
      })
      .send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const logout = (req, res) => {
  res
    .cookie("token", "", {
      sameSite: "none",
      secure: true,
      expires: new Date(0),
    })
    .send();
};

const loggedIn = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }

    jwt.verify(token, secret);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
};

const getLoggedUserInfo = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, secret);

    res.json(verified);
  } catch (err) {
    res.json(false);
  }
};

module.exports = {
  register,
  login,
  logout,
  loggedIn,
  getLoggedUserInfo,
};
