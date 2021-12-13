require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user');
const nodemailer = require('nodemailer');

const userController = {};

userController.signup = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    const emailUser = await User.findOne({ email });

    if (password !== confirmPassword) {
        res.status(403).json({
            server: 'Passwords not match',
        });
    } else if (emailUser) {
        res.status(401).json({
            server: 'User already registred',
        });
    } else {
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.status(200).json({
            server: 'User registred',
        });
    }
};

userController.login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user === null) {
        res.status(404).json({
            server: 'Email not found',
        });
    } else if (!(await user.matchPassword(password))) {
        res.status(403).json({
            server: 'Wrong password',
        });
    } else {
        user = user.toObject();
        delete user.resetPasswordToken;
        res.status(200).header().json({
            server: 'Login successfully',
            data: user,
        });
    }
};

userController.profile = async (req, res) => {
    let user = await User
        .findById(req.userId, ['name', 'email', 'order']);
    user = user.toObject();
    delete user._id;
    if (user === null) {
        res.status(404).json({
            server: 'Token corrupto :c',
        });
    } else res.status(200).json(user);
};

userController.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const emailHost = process.env.APP_HOST || "localhost";
    let user = await User.findOne({ email });
    if (user === null) {
        res.status(404).json({
            server: 'Email not found',
        });
        return;
    }

    user = user.toObject();
    const token = crypto.randomBytes(20).toString('hex');

    let doc = await User.findOneAndUpdate({ email }, { resetPasswordToken: token }, {
        new: true
    });

    if (doc.resetPasswordToken == null) {
        res.status(500).json({
            server: 'Error at update token',
        });
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });

    const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${user.email}`,
        subject: 'Link To Reset Password in Basic Login App',
        text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://${emailHost}:3000/reset/${token}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.error('there was an error: ', err);
        } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
        }
    });

};

userController.resetPassword = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const { token } = req.params;

    let user = await User.findOne({ email });
    if (user === null) {
        res.status(404).json({
            server: 'Email not found',
        });
        return;
    }
    user = user.toObject();

    if (user.resetPasswordToken === null || user.resetPasswordToken != token) {
        res.status(403).json({
            server: 'Invalid Token',
        });
        return;
    }
    if (password !== confirmPassword) {
        res.status(403).json({
            server: 'Passwords not match',
        });
        return;
    }
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    const updatedUser = { password: passwordHash, resetPasswordToken: null };


    let rsp = await User.findOneAndUpdate({ email }, updatedUser, {
        new: true
    });

    if (rsp === null) {
        res.status(500).json({
            server: 'Error at update password',
        });
        return;
    }

    res.status(200).json({
        server: 'Password Updated',
    });
};

module.exports = userController;