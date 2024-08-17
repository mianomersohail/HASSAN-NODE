const UserController=require('../UserController/UserController')
class UserServices{
    constructor(){
    }
    async Login(email,password){
        const User=new UserController();
        try{
            const Result=await User.Login(email,password)
            return Result;

        }catch(error){
           return error.message 
        }

    }
}
module.exports=UserServices;