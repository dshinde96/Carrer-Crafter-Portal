const mongoose=require('mongoose');
const {Schema}=mongoose;

const Drives=new Schema({
    CompanyName:{
        type:String,
        required:true
    },
    JobTitle:{
        type:String,
        required:true
    },
    JobDescription:{
        type:String,
        required:true   
    },
    Package:{
        type:Number
    },
    ExpectedOpening:{
        type:Number
    },
    EligibilityCriteria:{
        type:String,
        required:true
    },
    EligibleDepartMents:[],
    EligibleYears:[],
    Questions:[],
    InterestedStu:[{
        StuId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User_stu"
        },
        ApplicationID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Application"
        }
    }],
    EligibleStu:[{
        StuId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User_stu"
        },
        ApplicationID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Application"
        }
    }],
    SelectedStu:[{
        StuId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User_stu"
        },
        ApplicationID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Application"
        }
    }]
},{timestamps:true});

const Drive=mongoose.model("Drive",Drives);

module.exports=Drive;