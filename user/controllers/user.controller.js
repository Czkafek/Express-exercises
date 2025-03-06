const User = require("../models/User.model.js");
const { genPassword, verifyPassword } = require("../utils/password.utils.js");
const bcrypt = require("bcrypt");
const { verify, sign } = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");


const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json( users );
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const createUser = async (req, res) => {
    try {
        const { password, name } = req.body
        const isFound = await User.findOne({ name: name });
        if(isFound) return res.status(409).json({ message: "Username already taken" });
        await User.create({ name: name, password: await genPassword(password) });
        res.status(200).json({ message: "User has been successfully created" });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const loginUser = async (req, res) => {
    try {
        const { password, name } = req.body;
        const user = await User.findOne({ name: name });
        if(!user) return res.status(404).json({ message: "Such user does not exist"});
        if(!await verifyPassword(password, user.password)) return res.status(401).json({ message: "Invalid password" });
        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dni w milisekundach
            path: '/refresh_token'
        });
        res.status(200).json({ accessToken, message: "User has been successfully logged in" });

    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const logoutUser = async (req,res) => {
    try {
        await User.findByIdAndUpdate(req.body.id, {
            refreshToken: null
        });
        res.clearCookie('refreshtoken');
        return res.send({ message: "User has been logged out"});
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

const protectedRoute = async (req, res) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) throw new Error("You need to login");
        const token = authorization.split(' ')[1];
        const { userId } = verify(token, fs.readFileSync(path.join(__dirname, '../priv.pem'), 'utf8'));
        if (userId !== null) {
            res.status(200).json({ message: "This is protected data" });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

const refreshRoute = async (req, res) => {
    console.log('Cookies:', req.cookies);
    console.log('Headers:', req.headers);   
    const token = req.cookies.refreshtoken;
    if (!token) return res.status(401).json({ message: "cookies error", accesstoken: '' });
    let payload = null;
    try {
        payload = verify(token, fs.readFileSync(path.join(__dirname, '../priv.pem')));
    } catch (err) {
        res.status(500).json({ message: err });
    }
    // Token is valid so we check if user exists
    console.log(payload);
    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ accesstoken: '' });
    // User exist, check if refreshtoken exist on user
    if (user.refreshToken !== token) return res.status(401).json({ accesstoken: '' });
    // Create new Refresh and Access token
    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();  
    res.cookie('refreshtoken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dni w milisekundach
        path: '/refresh_token'
    });
    res.status(200).json({ accessToken });
}

const createAccessToken = userId => {
    return sign({ userId }, fs.readFileSync(path.join(__dirname, '../priv.pem'), 'utf8'), {
        expiresIn: '1m',
        algorithm: 'RS256'
    });
};

const createRefreshToken = userId => {
    return sign({ userId }, fs.readFileSync(path.join(__dirname, '../priv.pem'), 'utf8'), {
        expiresIn: '7d',
        algorithm: 'RS256'
    })
};



module.exports = { getUsers, createUser, loginUser, logoutUser, protectedRoute, refreshRoute };