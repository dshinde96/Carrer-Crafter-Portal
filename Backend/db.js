const mongoose = require('mongoose');

async function connecToMongo(mongoURL) {
   // mongoose.connect(mongoURL).then(()=>console.log("Connected")).catch((error)=>console.log(error.message));
   try {
      await mongoose.connect(mongoURL);
      console.log("Connected to Databse");
   } catch (error) {
      console.log(error.message);
   }
}

module.exports=connecToMongo;