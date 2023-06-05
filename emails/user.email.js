
const nodemailer = require("nodemailer");


module.exports.sendEmail=async(options)=>{


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hamzaramdan789@gmail.com  ",
      pass: "cdgdtvwzkfztdmfg", // generated ethereal password
    },
  });

// "mohamed142000nasser@gmail.com"

  let info = await transporter.sendMail({
    from: '"Ahmed Nabil" <hamzaramdan789@gmail.com>', // sender address
    to: options.email,     // list of receivers
    subject: "Hello ✔", // Subject line
    html: `
    <div style="background:#bbf ; color:#fff" ; padding:20px >
      <h2>hello every body  <h2/>
      <h1>${options.message}  <h1/>
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKQDHbIi9VrgFDP9FSmp1fwuAiUeI-JTpCHiuAHNqowhRmiLDg-zM19ljLNFnW40dQqzU&usqp=CAU"/>
      <br>
      <a href="http://localhost:3000/users/verify/${options.token}">verify</a>
    
    <div/>
    `,
    
  },(err,info)=>{
    if(err){
      console.log(err);
    }else{

      console.log(info);
    }
  });

}




//   aswvtxeevwscmzbu