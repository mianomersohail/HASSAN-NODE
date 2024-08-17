const express=require('express')
const routes=express.Router()
routes.get('/',(req,res)=>{
    const token=req.cookies.token;
    res.clearCookie('token',token).render('LoginForm',{errorMessage:"You are LogOut"})
})
module.exports=routes;