const mongoose=require('mongoose');
const {Schema}=mongoose;

const Application=new Schema({
    DriveId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Drive"
    },
    StudentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Drive"
    },
    Answers:{}
});

module.exports=mongoose.model("Application",Application);