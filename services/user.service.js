const userModel=require('../models/user.model')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const { sendEmail } = require('../emails/user.email');


module.exports.signup=async(req,res)=>{
    const {name,email,password,age}=req.body
    let user = await userModel.findOne({email})

    if(user){
        res.json({message:"email already exist"})

    }else{
        bcrypt.hash(password,5,async(err,hash)=>{
        let user= await userModel.insertMany({name,email,password:hash,age})
        let token= jwt.sign({email}, 'secret')
         sendEmail({email,token,message:"Hi"})

            res.json({message:"success",user})
        })
    }

}


module.exports.signin=async(req,res)=>{

    const {email,password}=req.body
    let user= await userModel.findOne({email})
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            var token = jwt.sign({role:"user",userid:user._id,name:user.name}, 'secret');
            if(user.emailconfirm==true){
                
                res.json({message:"go to login",token})
             }else{
                res.json({message:"verify your email"})

             }
        }else{
             res.json({message:"incorrect password"})
        }

    }else{
    res.json({message:"email dose't exist"})

    }
}



module.exports.emailVerify= (req,res) => {

    const {token}=req.params;
    jwt.verify(token,'secret',async(err,decoded)=>{
        if(err){
            res.json(err)
        }else{
             let user =await userModel.findOne({email:decoded.email})
        if(user){
            await userModel.findOneAndUpdate({email:decoded.email},{emailconfirm:true})
            res.json({message:"Verified"})
        }else{
            res.json({message:"user not found"})
        }
        }
    })
       


}