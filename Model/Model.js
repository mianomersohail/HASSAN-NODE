const mongoose=require('mongoose')

const HassanProject=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default :'Not-admin'
    }
})
    const HassanMessageSchema = new mongoose.Schema({
        message: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    });
const Hassan=new mongoose.model('Hassan',HassanProject)
const HassanMessage=new mongoose.model('HassanMessage',HassanMessageSchema)
module.exports={
    Hassan:Hassan,
    HassanMessage:HassanMessage
}