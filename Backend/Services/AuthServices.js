const jwt = require("jsonwebtoken");
const fs=require('fs');
let secretKey=process.env.secretKey;

//read the secretkey from the file
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
            console.log(authTocken);
            return authTocken;
        }
    }
    catch (error) {
        console.log(error)
        return ;
    }
};

const validateTocken = (authTocken) => {
    try {
        const payload = jwt.verify(authTocken, secretKey);
        return payload;
    } catch (error) {
        console.log(error)
        return new Error(error);
    }
};

module.exports={generateTocken,validateTocken};