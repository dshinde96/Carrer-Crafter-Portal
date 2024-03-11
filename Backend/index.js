require('dotenv').config()
const connecToMongo=require('./db');
const express=require('express');
const cors=require('cors');

//connect to mongoose
const mongoURL=process.env.MONGOURL;
connecToMongo(mongoURL);

const PORT=process.env.PORT;
var app=express();
app.use(express.json());
app.use(cors());

app.use('/user',require('./Routes/User'));
app.use('/Student',require('./Routes/UserstuRoute'));
app.use('/Drive',require('./Routes/Drive'));
app.use('/PlacementStat',require('./Routes/PlacementStat'));

app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
})