
// const Joi = require('joi');
// let methods=["body","params"]


// let schema={
//     body:Joi.object({
//         name:Joi.string().min(3).max(10).required(),
//         email:Joi.string().email().required(),
//         password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
//         repassword:Joi.ref('password'),
//         age:Joi.number().min(15).max(60).required()
//     }),
//     params:Joi.object({
//         id:Joi.string().required().min(4).max(4)
//     })

// }


// module.exports.userValidation=(req,res,next)=>{
//     let errArray=[]

//     methods.map((key)=>{

//         let {error}=schema[key].validate(req[key],{abortEarly:false})

//         if(error){

//             error.details.map((msg)=>{
//                 errArray.push(msg.message)
//         })
//      }
//     })


//     if(errArray.length>0){
        
//         res.json(errArray)
//         }else{
//             next()
//         }
//         // res.json({message:"error",errArray})


// }



