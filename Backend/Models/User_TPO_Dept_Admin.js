const mongoose=require("mongoose");
const {Schema}=mongoose;

const TPO_Dept_Admin=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    dept:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"TPO_Dept_Admin"
    },
    password:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model("TPO_Dept_Admin",TPO_Dept_Admin);