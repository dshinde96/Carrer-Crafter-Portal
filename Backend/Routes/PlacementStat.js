const express=require('express');
const router=express.Router();
const { AuthenticateUser, restrictTo } = require('../Middleware/Authentication');
const {handleCompaniesVisited}=require('../Controllers/PlacementStatController');

router.get('/CompaniesVisited',AuthenticateUser,handleCompaniesVisited);
// router.get('/SelectedStu/:CompanyName',AuthenticateUser,handleCompanyStu);

module.exports=router;