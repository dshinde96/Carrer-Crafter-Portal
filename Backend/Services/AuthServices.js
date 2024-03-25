const jwt = require("jsonwebtoken");
const fs=require('fs');
require('dotenv').config()
let secretKey=process.env.secretkey;

// read the secretkey from the file
// fs.readFile('../Private/Private.txt','utf-8',(err,res)=>{
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         secretKey=res;
//     }
// });

const generateTocken = (user) => {
    try {
        if (user.role == "Student") {
            console.log(secretKey);
            const payload = {
                id: user.id,
                name: user.name,
                reg_no: user.reg_no,
                role: user.role
            }
            const authTocken = jwt.sign(payload, secretKey);
            return authTocken;
        }else if(user.role=="TPO_Dept_Admin"){
            const payload = {
                name: user.name,
                email: user.email,
                role: user.role,
                dept:user.dept
            }
            const authTocken = jwt.sign(payload, secretKey);
            return authTocken;
        }else {
            const payload = {
                name: user.name,
                email: user.email,
                role: user.role
            }
            const authTocken = jwt.sign(payload, secretKey);
            return authTocken;
        }
    }
    catch (error) {
        // return res.status(500).send({ msg: "Internal Server Error" });
        console.log(error.message);
        return null;
    }
};

const validateTocken = (authTocken) => {
    try {
        const payload = jwt.verify(authTocken, secretKey);
        return payload;
    } catch (error) {
        return res.status(500).send({ msg: "Internal Server Error" });
    }
};

module.exports={generateTocken,validateTocken};