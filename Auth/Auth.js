const jwt=require('jsonwebtoken')
const Secret='Umer-Sohail'

function SetUser(user){
    const User={
        email:user.email,
        id:user.id,
        role:user.role
    }
    return jwt.sign(User,Secret)
}
function GetUser(user){
    if(!user)return null;
    return jwt.verify(user,Secret)
}
module.exports={
    SetUser,
    GetUser
}
