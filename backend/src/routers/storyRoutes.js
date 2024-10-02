const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const {createStory, getStoryByUser, getStoryById, getStoryByCategory, updateStory} = require('../controllers/storyController');

// post get put delete 

router.get('/', (req, res) => {
    res.json({
        message: ' Story Route Is working Fine',
        status: 'Success'
    })
})

router.get('/find' , verifyToken , getStoryByUser())

router.get('/get/:id' , getStoryById())

router.get('/category' , getStoryByCategory())

router.post('/create', verifyToken , createStory())

router.put('/update/:id', verifyToken , updateStory())

// router.put('/updatelike/:id',  updateImpression())


module.exports = router 
