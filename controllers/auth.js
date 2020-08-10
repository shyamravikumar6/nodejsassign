// @ts-ignore
const userprofile = require('../models/userprofile');
const User =  require('../models/user');
const {validationResult} = require('express-validator');
var jwt = require('jsonwebtoken');
// @ts-ignore
const bcrypt = require('bcrypt');
// @ts-ignore
var expressjwt =require('express-jwt');
// @ts-ignore
exports.signout=(req,res)=>{
     
    res.clearCookie();
     //const user = new User(req.body);

    res.json({
           message:"users singing out"
      });
}

//  exports.signupuser= (req,res)=>{
//     console.log(req);
//     const  errors = validationResult(req);
   
//     if(!errors.isEmpty()){
//         return res.status(422).json({
//             errors:errors.array()[0].msg
//          });
//    }
//           const userData = {
//               userName:req.body.userName,
//               userAdd: req.body.userAdd,
//               userNum: req.body.userNum,
//               useremail:req.body.useremail,
//                password: req.body.password
//             }


            
                           
//          userprofile.findOne({email:req.body.useremail})
//          .then(user=>{
//              if(!user){
//                  bcrypt.hash(req.body.password,10,(err,hash)=>{
//                       userData.password=hash;
//                       userprofile.create(userData)
//                       .then(user=>{
//                           res.status(200).json({status:'regiserted',user:user});
//                       })
//                       .catch(err=>{ res.send('error'+err)})
//                  });

//              }else{
//                  res.status(422).json({error:'user alreadyexist',user:user});
//              }
            
//              }).catch(err=>{
//                 res.send('error:'+err);
//          }
             
//          )
      


//  }



exports.signup=(req,res)=>{
    const errors = validationResult(req);
     if(!errors.isEmpty()){
          return res.status(422).json({
              errors:errors.array()[0].msg
           })
     }
     const user = new User(req.body);
       User.findOne({email:req.body.email}).then((err,user)=>{
             if(!user|| err){
                  return  res.json({email:"Already registerd"});

             }
            

       });
       user.save((err,user)=>{
        if(err){
            return res.status(400).json({err:"something is missing"});
        }
        return res.json(user);
     });
     
     
}

exports.signin =(req,res)=>{
       
    const {email,password} = req.body;
  const errors= validationResult(req);
     if(!errors.isEmpty()){
      return res.status(422).json({
          errors:errors.array()[0].msg
       });   
     } 

     User.findOne({email},(err,user)=>{
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
            
             res.cookie("token",token,{expire:new Date() + '999'});
            
             // @ts-ignore
             const {_id,firstname,email,role}= user;
             return res.json({token,user:{_id,firstname,email,role}})
     });
}

exports.isSigned =expressjwt({secret:process.env.SECRET,algorithms: ['HS256'],userProperty:"auth"});


exports.isAuthenticated=(req,res,next)=>{
       let checker = req.profile && req.auth && req.auth._id== req.profile._id;
       if(!checker){
          return  res.status(403).json({
               access:"Acces DENIED"
           })
       }
       next();
}


exports.isAdmin=(res,req,next)=>{

      if(req.profile.role==0){
          return res.status.json({
              error:"NOT A ADMIN"
          });
      }

      next();
}