const User = require('../models/user');
const {validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
// @ts-ignore
var expjwt =require('express-jwt');
exports.signout=(req,res)=>{
     // @ts-ignore
     const user = new User(req.body);

    res.json({
           message:"users singing out"
      });
}

exports.signup=(req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty()){
          return res.status(422).json({
              errors:errors.array()[0].msg
           })
     }
     const user = new User(req.body);
     user.save((err,user)=>{
        if(err){
            return res.status(400).json({err:"something is missing"});
        }
        return res.json(user);
     })
}

exports.signin =(req,res)=>{
       
    const {email,password} = req.body;
  const errors= validationResult(req);
     if(!errors.isEmpty()){
      return res.status(422).json({
          errors:errors.array()[0].msg
       });   
     } 

     User.findOne(email,(err,user)=>{
            if(err||!user){
              return  res.status(400).json({
                  error:"email is not regiserted with us",
                  users:{user:user}
                });
            }
            
            
            // @ts-ignore
            if(!user.Authenticate(password)){
                return res.status(422).json({
                    error:"password is not matched"
                });
            }

             const token = jwt.sign({_id:user._id},process.env.SECRET);
             // @ts-ignore
             res.cookie("token",token,{expire:new Date() + 999});
             // @ts-ignore
             const {_id,firstname,email,role}= user;
             return res.json({token,user:{_id,firstname,email,role}})
     });
}