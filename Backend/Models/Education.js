const mongoose=require('mongoose');
const {Schema}=mongoose;

const Education=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User_stu",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    school:{
        type:String,
        // required:true
    },
    start_year:{
        type:Date,
        // required:true
    },
    end_year:{
        type:Date,
        // required:true
    },
    percentage:{
        type:Number
    }
})

module.exports=mongoose.model("Education",Education);
