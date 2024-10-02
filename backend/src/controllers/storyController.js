const StoryModel = require('../models/Story');

function createStory() {
    return async(req , res , next) =>{
        try {
            const { slidesDetails , category } = req.body;
            const story = new StoryModel({
                storyCategory: category ,
                userId : req.user_id,
                slides:slidesDetails
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
                Quiz
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
            
            const updatedStory = await StoryModel.findByIdAndUpdate(storyId , {
                storyCategory: category ,
                slides:slidesDetails
            })
            res.status(201).json({
                status:"Success",
                updatedStory
            })
        } catch (error) { 
            next('Error For updating Quiz' , error)
        }
    }
}

function updateLikes (){
    return async(req , res , next) =>{
        try {
            const quizId = req.params.id ;
            const existingQuiz = await QuizModel.findById(quizId)
            const impr = existingQuiz.impression
            const updatedQuiz = await QuizModel.findByIdAndUpdate(quizId , {
                impression : impr + 1
            })
            res.status(201).json({
                status:'Success' ,
                impression : impr + 1
            })
        } catch (error) {
            next("Invalid Quiz", error);
        }
    }
}


module.exports = {
    createStory,
    getStoryByCategory,
    getStoryByUser,
    getStoryById,
    updateStory
}