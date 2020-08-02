var mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid');





var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:"true",
        maxlength:32,
        trim:true
    },
    
    lastname:{
        type:String,
        trim:true,
        maxlength:32

    },
    encryptPassword:{
         type:String,
         required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        maxlength:32,
        unique:true
    },
    salt:String,
    purchases:{
        type:Array,
        default:[]
    },
    role:{
        type:Number,
        default:0
    }

   

});



userSchema.virtual("password")
.set(function(password){
        this._password = password;
        this.salt= uuidv1.v1();
        
        this.encryptPassword = this.securePassword(password);
})
.get(function(){
      return this._password;
})

userSchema.methods={                                                         


    Authenticate: function(plainPassword){
        
        return this.securePassword(plainPassword) === this.encryptPassword;
   }, 



 securePassword:function(plainPassword){
        if(!plainPassword) return "";
        try {
            // @ts-ignore
            return crypto.createHash('sha256',this.salt)
            .update(plainPassword)
            .digest('hex')
        } catch (err) {
            return "";
        }
    }

  

   
};





module.exports = mongoose.model('User',userSchema);