import axios from "axios";

const BACKEND_ORIGIN_URL = 'http://localhost:4005/user'

const Login = async (userName , password) =>{
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/login` , {userName , password})
        return response
    } catch (error) {
        return error.response ;
    }
}

const Register = async (userName , password) =>{
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/register` , {userName , password})
        return response
    } catch (error) {
        return error.response ;
    }
}

const getUser = async () =>{
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


export {Login , Register , getUser }