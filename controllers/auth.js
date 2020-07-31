const User = require('../models/user');


exports.signout=(req,res)=>{
     const user = new User(req.body);

    res.json({
           message:"users singing out"
      });
}

exports.signup=(req,res)=>{
    
    const user = new User(req.body);
     user.save((err,user)=>{
        if(err){
            return res.status(400).json({err:"something is missing"});
        }
        return res.json(user);
     })
}