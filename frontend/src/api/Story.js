import axios from "axios";

const BACKEND_ORIGIN_URL = 'http://localhost:4005/story'

const createStory = async (slidesDetails , category) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/create` , { slidesDetails , category } , config)
        return response
    } catch (error) {
        return error.response ;
    }
}

const getStoriesByUser = async () =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/find` , config )
        return response
    } catch (error) {
        return error.response
    }
}
const getStoryById = async (id) =>{
    try {
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/find/${id}`)
        return response
    } catch (error) {
        return error.response
    }
}
const getStoryByCategory = async (category) =>{
    try {
        const response = await axios.get(`${BACKEND_ORIGIN_URL}/category?category=${category}` )
        return response
    } catch (error) {
        return error.response
    }
}
const updateSelectedQuiz = async (quizId , quiz) =>{
    const {quizName , quizType , questions , userId } = quiz
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.put(`${BACKEND_ORIGIN_URL}/update/${quizId}` , {quizName , quizType , questions , userId} , config)
        return response
    } catch (error) {
        return error.response ;
    }
}

const updateImpression = async (quizId ) =>{
    try {
        const response = await axios.put(`${BACKEND_ORIGIN_URL}/updateimpression/${quizId}` )
        return response
    } catch (error) {
        return error.response ;
    }
}

const saveResponse = async (quizId , responseArr ) =>{
    try {
        const response = await axios.put(`${BACKEND_ORIGIN_URL}/updateresponse/${quizId}` , {responseArr} )
        return response
    } catch (error) {
        return error.response ;
    }
}


const deleteQuiz = async (id) =>{
    try {
        const token = localStorage.getItem('userToken')
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios.delete(`${BACKEND_ORIGIN_URL}/delete/${id}` , config)
        return response
    } catch (error) {
        return error.response
    }
}

export {createStory , getStoriesByUser , getStoryById , getStoryByCategory}
// export{createForm , updateForm , getForm , getFormById , deleteForm , updateView}