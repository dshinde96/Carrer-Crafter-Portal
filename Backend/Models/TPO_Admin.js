const mongoose=require('mongoose');
const {Schema}=mongoose;

const TPO_Admin=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mob_no:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    dept:{
        type:String
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("TPO_Admin",TPO_Admin);