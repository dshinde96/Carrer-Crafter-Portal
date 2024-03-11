const mongoose=require('mongoose');
const {Schema}=mongoose;

const OTP=new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt: {
        type: Date,
        expires: 60, // TTL set to 60 seconds (1 minute)
        default: Date.now
    }
});

module.exports=mongoose.model("OTP",OTP);