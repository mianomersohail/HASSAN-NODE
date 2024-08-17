const {Hassan}=require('../Model/Model')
class UserController{
    constructor(){    }
    async Login(email,password){
        try{
            const Result=await Hassan.findOne({email,password})
            console.log("this is ",Result)
            if(Result){return 'Authenticate'}
            else{return 'Un-Authenticate'}
        }catch(error){return error.message}
    }}
module.exports=UserController;
