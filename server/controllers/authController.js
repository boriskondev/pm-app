const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {secret, saltRounds} = require("../config/config");

// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// https://www.alibabacloud.com/blog/how-to-implement-authentication-in-reactjs-using-jwt_595820

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

const maxAge = 3 * 24 * 60 * 60;

const createToken = (data) => {
    return jwt.sign(data, secret, {
        expiresIn: maxAge
    });
};

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

        const token = createToken({
            userID: userObject._id,
            username: userObject.username
        });

        // res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json("The token is: " + token);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

// const login_post = async (req, res) => {
//     const {email, password} = req.body;
//
//     try {
//         const user = await User.login(email, password);
//         const token = createToken(user._id);
//         res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
//         res.status(200).json({user: user._id});
//     } catch (err) {
//         const errors = handleErrors(err);
//         res.status(400).json({errors});
//     }
// }
//
// const logout_get = (req, res) => {
//     res.cookie("jwt", "", {maxAge: 1});
//     res.redirect("/");
// }

module.exports = {
    register,
}