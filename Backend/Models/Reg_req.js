const mongoose=require('mongoose');
const {Schema}=mongoose;
const User=new Schema({
    name:{
        type:String,
        required:true
    },
    reg_no:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"Student"
    },
    email:{
        type:String,
        required:true
    },
    mob_no:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("User_req",User);