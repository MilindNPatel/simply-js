const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');
const Profile = require('../models/profile');

// Register
exports.register = function (req, res) {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.getUserByUsername(req.body.username, (err, username) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to find user' });
        }
        if (username) {
            res.json({ success: false, msg: 'User already exist' });
        }
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.json({ success: false, msg: 'Failed to register user' });
            } else {
                let newProfile = new Profile({
                    userid: user._id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email
                })
                Profile.addUserProfile(newProfile, (err, profile) => {
                    if (err) {
                        res.json({ success: false, msg: 'Failed to save profile' });
                    } else {
                        res.json({ success: true, msg: 'User registered' });
                    }
                })
            }
        });
    })
};

// Authentication
exports.authenticate = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        // if (err) throw err;
        if (err) {
            return res.json({ success: false, msg: 'Failed to find user' });
        }
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }              
        User.comparePassword(password, user.password, (err, isMatch) => {
            // if (err) throw err;
            if (err) {
                res.json({ success: false, msg: 'Failed to match user data' });
            }
            if (!isMatch) {
                return res.json({ success: false, msg: 'Wrong password' });                
            } 
            const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                }
            })             
        });
    });
}

// Get Profile
exports.gprofile = function (req, res) {
    Profile.getUserProfile(req.params, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to get user profile' });
        } else {
            res.json({ success: true, msg: 'User profile updated successfully', user });
        }
    });
};

// Update Profile
exports.uprofile = function (req, res) {
    Profile.updateUserProfile(req.params, req.body, (err, profile) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update user profile' });
        } else {
            res.json({ success: true, msg: 'User profile updated successfully' });
        }
    });
};
