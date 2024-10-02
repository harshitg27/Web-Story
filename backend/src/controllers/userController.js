const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

function handleLogin() {
    return async (req, res, next) => {

        try {
            const { userName, password } = req.body;
            const existingUser = await UserModel.findOne({ userName });
            if (!existingUser) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'User Not Found',
                });
            }
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Incorrect Password',
                });

            }
            const jwToken = jwt.sign({ id: existingUser._id }, process.env.JWT_Private_Key);
            res.status(200).json({
                status: 'Success',
                message: 'Login successfully',
                userToken: jwToken
            });
        } catch (err) {
            next("Error Logging In", err);
        }
    };
}

function registerUser() {
    return async (req, res, next) => {
        try {
            const { userName , password } = req.body;
            // throw new Error('creating Register Page Error')
            const existingUser = await UserModel.findOne({ userName });
            if (existingUser) {
                return res.status(400).json({
                    message: "User already Exist Please use another Email "
                });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const newUser = new UserModel({
                userName,
                password: hashedPassword
            });
            await newUser.save();
            res.status(201).json({
                status: 'Success',
                message: 'User created successfully'
            });

        } catch (error) {
            next("Error For Creating User", error);
        }
    };
}

function findUser(){
    return async (req, res, next) => {
        try {
            const userId = req.user_id ;
            const existingUser = await UserModel.findById(userId);
            if (!existingUser) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'User Not Found',
                });
            }
            res.status(201).json({
                status: 'Success',
                message: 'Login successfully',
                userName : existingUser.userName
            });
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    handleLogin ,
    registerUser ,
    findUser
}