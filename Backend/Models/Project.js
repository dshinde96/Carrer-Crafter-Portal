const mongoose=require('mongoose');
const {Schema}=mongoose;
const Project=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User_stu',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    start_date:{
        type:Date,
        required:true
    },
    end_date:{
        type:Date,
        required:true
    }
});

module.exports=mongoose.model("Project",Project);