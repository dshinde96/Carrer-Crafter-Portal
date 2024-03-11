const mongoose=require('mongoose');
const {Schema}=mongoose;

const Experience=new Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User_stu",
        required:true
    },
    Array:[{
        position:{
            type:String,
            required:true
        },
        org:{
            type:String,
            required:true
        },
        start_year:{
            type:Date,
            required:true
        },
        end_year:{
            type:Date,
            required:true
        }
    }]
})

module.exports=mongoose.model("Experience",Experience);