var mongoose = require('mongoose');



var userSchema = new mongoose.Schema({
    
   
    userName:{
         type:String,
         trim:true,
         required:true,
          maxlength:10
        
    },
    userAdd:{
        type:String,
        required:true

       },
       userNum:{
        type:Number,
        trim:true,
        required:true,
        maxlength:12,
        unique:true
    },

        useremail:{
            type:String,
            trim:true,
            required:true,
            unique:true,
        
        },
        password:{
            type:String,
            required:true
           },
          
      

        userPic:{
            type:Array,
            default:[]

        }
        

    

});



module.exports =  mongoose.model("userProfile",userSchema);