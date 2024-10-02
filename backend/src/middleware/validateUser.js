
const validateUser = (req , res , next) =>{
    const {userName , password} = req.body ;
    if(!userName || !password){
        return res.status(400).json({
            status: 'Error' ,
            message: 'Pleave Provide all required Fields'
        })
    }
    
    next()
}

module.exports = validateUser ;