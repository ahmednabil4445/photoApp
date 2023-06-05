
const mongoose=require('mongoose')


const schema =  mongoose.Schema({
    name:String,
    email:String,
    password:String,
    verified:{
        type:Boolean,
        default:false,
    },
    pic_url:{
        type:String,
        default:'user.png',
    },
    age:{
        type:Number,
    }
});

module.exports= mongoose.model("user",schema)
