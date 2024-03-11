const {validateTocken}=require('../Services/AuthServices');

const AuthenticateUser=(req,res,next)=>{
    const tocken=req.header('auth-tocken');
    if(!tocken)
    {
        return res.status(401).send("Access denied");
    }
    try {
        const payload=validateTocken(tocken);
        if(!payload){
            return res.status(401).send("Access denied");
        }
        req.user=payload;
        // console.log(payload);
        next();
    } catch (error) {
        console.log(error);
        return res.status(501).json({msg:"Internal Server Error"});
    }
}

const restrictTo=(roles)=>{
    return function(req,res,next){
        if(!roles.includes(req.user.role)){
            return res.status(401).send({msg:"Access Denied"});
        }
        next();
    }
}
module.exports={AuthenticateUser,restrictTo};