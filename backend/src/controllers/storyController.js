const StoryModel = require('../models/Story');

function createStory() {
    return async(req , res , next) =>{
        try {
            const { slidesDetails , category } = req.body;
            const slides = slidesDetails.map((slide , index) => {
                slide.likes = []
                return slide
            })
            const story = new StoryModel({
                storyCategory: category ,
                userId : req.user_id,
                slides
            })
            await story.save()
            res.status(201).json({
                status:"Success",
                story
            })
        } catch (error) { 
            next('Error For Creating Stories' , error)
        }
    }
}

function getStoryByUser (){
    return async(req , res , next) =>{
        try {
            const userId = req.user_id ;
            const stories = await StoryModel.find({userId })
            if(!stories){
                res.status(400).json({
                    status:'Failed',
                    message:'No Story Exist'
                })
                return
            }
            res.status(200).json({
                status:'Success' ,
                stories
            })
        } catch (error) {
            next("error For Fetching Stories", error);
        }
    }
}

function getStoryByCategory (){
    return async(req , res , next) =>{
        try {
            const storyCategory = req.query.category
            const stories = await StoryModel.find({storyCategory })
            if(!stories){
                res.status(400).json({
                    status:'Failed',
                    message:'No Story Exist'
                })
                return
            }
            res.status(200).json({
                status:'Success' ,
                stories
            })
        } catch (error) {
            next("error For Fetching Stories", error);
        }
    }
}

function getStoryById (){
    return async(req , res , next) =>{
        try {
            const StoryId = req.params.id ;
            const Story = await StoryModel.findById(StoryId)
            if(!Story){
                res.status(400).json({
                    status:'Failed',
                    message:'Incorrect Story Id'
                })
                return
            }
            res.status(200).json({
                status:'Success' ,
                Story
            })
        } catch (error) {
            next("Invalid Url or Story", error);
        }
    }
}

function updateStory() {
    return async(req , res , next) =>{
        try {
            const storyId = req.params.id ;
            const { slidesDetails , category } = req.body;
            const Story = await StoryModel.findById(storyId)
            const slides = slidesDetails.map((slide , index) => {
                slide.likes = Story.slides[index].likes
                return slide
            })
            const updatedStory = await StoryModel.findByIdAndUpdate(storyId , {
                storyCategory : category ,
                slides
            })
            res.status(201).json({
                status:"Success",
                updatedStory
            })
        } catch (error) { 
            console.log(error)
            next('Error For updating Story' , error)
        }
    }
}

function updateLikes (){
    return async(req , res , next) =>{
        try {
            const storyId = req.params.id ;
            const {slideIndex} = req.body
            const Story = await StoryModel.findById(storyId)
            const storySlides = Story.slides
            // console.log(Story.slides[slideIndex])
            const userFind = storySlides[slideIndex].likes.find((user) => user === req.user_id)
            if(userFind){
                storySlides[slideIndex].likes = Story.slides[slideIndex].likes.filter((user) => user != req.user_id)
            }else{
                storySlides[slideIndex].likes.push(req.user_id)
            }
            const updatedLike = await StoryModel.findByIdAndUpdate(storyId , {
                slides: storySlides
            })
            res.status(201).json({
                status:'Success' ,
                updatedLike
            })
        } catch (error) {
            next("Invalid Story", error);
        }
    }
}


module.exports = {
    createStory,
    getStoryByCategory,
    getStoryByUser,
    getStoryById,
    updateStory ,
    updateLikes
}