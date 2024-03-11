const express=require('express');
const Drive=require('../Models/Drive');
const handleCompaniesVisited=async (req,res)=>{
    const drives=await Drive.find({});
    const ComapaniesVisited=[];
    drives.map((drive)=>{
        let index=ComapaniesVisited.findIndex((company)=>company.CompanyName===drive.CompanyName);
        if(index<0){
            ComapaniesVisited.push({
                CompanyName:drive.CompanyName,
                StuCnt:drive.SelectedStu.length,
                package:drive.Package
            })
        }
        else{
            ComapaniesVisited[index].StuCnt+=drive.SelectedStu.length;
        }
    })

    return res.json({ComapaniesVisited});
}

module.exports={handleCompaniesVisited};