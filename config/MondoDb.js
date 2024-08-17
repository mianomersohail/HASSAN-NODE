require('dotenv').config()
const mongoose=require('mongoose')
class MongoDbConnection{
    constructor(){
    }
    async testconnection(){
        return mongoose.connection.readyState;
    }
    async connect(){
        const string=process.env.MONGO_URL
        mongoose.connect(string,{
            dbName:'Practice'
        }).then(function(){
            console.log(`DataBase Connected Successfully`)
        }).catch(function(error){
            console.log(error)
        })}
}
module.exports=MongoDbConnection;