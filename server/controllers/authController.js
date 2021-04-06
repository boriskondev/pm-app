const User = require("../models/user");
// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {saltRounds} = require("../config/config");

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {email: "", password: ""};

    // Incorrect email
    if (err.message === "Incorrect email.") {
        errors.email = "That email is not registered.";
    }

    // Incorrect password
    if (err.message === "Incorrect password.") {
        errors.password = "That password is incorrect.";
    }

    // Duplicate email error
    if (err.code === 11000) {
        errors.email = "That email is already registered.";
        return errors;
    }

    // Validation errors
    if (err.message.includes("user validation failed")) {
        // console.log(err);
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (data) => {
//     return jwt.sign(data, secret, {
//         expiresIn: maxAge
//     });
// };

const register = async (req, res) => {
    const {username, department, email, password} = req.body;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            department,
            email,
            password: hashedPassword
        });

        const userObject = await user.save();

        // const token = createToken({
        //     userId: userObject._id,
        //     username: userObject.username
        // });

        res.status(201).json({userId: userObject._id, username: userObject.username});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            throw new Error("Incorrect email.");
        }

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            throw new Error("Incorrect password.");
        }

        // const token = createToken({
        //     userId: user._id,
        //     username: user.username
        // });

        res.status(200).json({userId: user._id, username: user.username});
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}
//
// const logout_get = (req, res) => {
//     res.cookie("jwt", "", {maxAge: 1});
//     res.redirect("/");
// }

module.exports = {
    register,
    login
}