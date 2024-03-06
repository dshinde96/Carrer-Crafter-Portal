const mongoose=require('mongoose');
const User_stu = require('./User_stu');
const {Schema}=mongoose;
const PendingReq=new Schema({
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
    },
    Reqtype:{
        type:String,
        required:true
    },
    OriginalStu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User_stu"
    }
});

module.exports=mongoose.model("PendingReq",PendingReq);