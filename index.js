require('dotenv').config();
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const Mongo = require('./config/MondoDb');
const cookieParser = require('cookie-parser');
const {HassanMessage}=require('./Model/Model.js')
const app = express();
app.use(cookieParser());
const server = http.createServer(app);
const io = socketIo(server); // Initialize Socket.IO with the HTTP server
// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// MongoDB Connection
const Mongoconnection = new Mongo();
if (Mongoconnection.testconnection() !== 1) {
    Mongoconnection.connect();}
// Socket.IO logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    socket.on('message',async (message)=>{
        const NewMessage= new HassanMessage ({message:message})
        try{
            const result=await NewMessage.save()
            const Result=await HassanMessage.find();
            io.emit('message-from-server',Result)
        }catch(error){
            console.log('Error receiving message',error)}
    })
    // Handle socket events here
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);});
});
// Routes
app.use('/courses',(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){res.render('LoginForm',{errorMessage:"You are Not LogIn"})}
    const checktoken=GetUser(token)
    if(checktoken){
        next()
    }
    else{
        res.render('LoginForm',{errorMessage:"You re not Login"})
    }
})
app.use('/Chat',(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){res.render('LoginForm',{errorMessage:"You are not Login"})}
    const checktoken=GetUser(token);
    if(checktoken){
        next()
    }
    else{
        res.render('LoginForm',{errorMessage:"You are not Login"})
    }
})
app.use('/Home',(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){res.render('LoginForm',{errorMessage:"Your Are Not Login"})}
     const checktoken=GetUser(token)
    if(checktoken && checktoken.role=='Admin'){
        req.user='Admin'
       return  next()
    }
    if(checktoken && checktoken.role=='Not-admin'){
        req.user='Not-admin'
        return next()
    }
    else{
        res.render('LoginForm',{errorMessage:"You Are Not Login"})
    }
})
app.use('/login',(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return next()
    }
    const checktoken=GetUser(token);
    console.log(checktoken)
    if(checktoken && checktoken.role=='Admin'){
        res.render('Home',{role:"Admin",message:''})
    }
    else if(checktoken && checktoken.role=='Not-admin'){
        res.render('Home',{role:"Not-admin"})
    }
    else{
        next()
    }
})
app.use('/UserRegister',function(req,res,next){
    const token=req.cookies.token;
    if(!token)res.render('LoginForm',{errorMessage:"Plz Login"})
        const User=GetUser(token)
    if(User){
        next()
    }
    else{
        res.render('LoginForm',{errorMessage:"PlZ Login"})
    }
})
const Login = require('./Routes/Login');
const CookiesRemove=require('./Routes/Logout.js')
const UserRegister=require('./Routes/UserRegister.js')
const { GetUser } = require('./Auth/Auth.js');
app.use('/login', Login);
app.use('/Logout',CookiesRemove)
app.use('/UserRegister',UserRegister)
app.get('/searchmessage',async function(req,res){
    const Result=await HassanMessage.find()
    console.log('result')
    res.send(Result) })
//all ejs routes
app.get('/courses',function(req,res){

    res.render('Courses')
})
app.get('/Chat',function(req,res){
    res.render('Chat')
})
app.get('/Home',(req,res)=>{
    if(req.user=='Admin')
        res.render('Home',{role:'Admin',message:''})
    else if(req.user=='Not-admin'){
        res.render('Home',{role:'Not-admin',message:''})
    }
    else{
        res.send("You are not authorized")
    }
})
// Start Server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
