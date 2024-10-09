const express = require('express')
const router = express.Router();
const validateUser = require('../middleware/validateUser')
const {
    handleLogin ,
    registerUser, 
    findUser,
    addBookmark
} = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

// post get put delete 

router.get('/', (req, res) => {
    res.json({
        message: 'User Route Is working Fine',
        status: 'Success'
    })
})

router.post('/register', validateUser, registerUser())

router.post('/login', handleLogin())

router.get('/find', verifyToken , findUser())

router.put('/addbookmark' , verifyToken , addBookmark())

module.exports = router 
