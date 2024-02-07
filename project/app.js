//BldhsXxIyI3GU1HC
require("dotenv").config()
const cors=require('cors');
const express =require('express');
const mongoose = require('mongoose')
const tasksRouter =require('./routes/tasks')
const users =require('./routes/users')
const taskCnt =require('./routes/taskCnt')
const bodyParser = require('body-parser');

// const alloweOrigins=[
//     'http://localhost:3000',
//     'http://localhost:5000/tasks'
// ]
// const corsOptions={
//     origin:(origin,callback)=>{
//         if(alloweOrigins.indexOf(origin) !== -1 || !origin){
//             callback(null,true)
//         }else{
//             useCallback(new error('not allowed by CORS'))
//         }
//     },
//     credentials:true,
//     optionsSuccessStatus:200
// }
// module.exports=corsOptions


const app=express();
app.use(cors());
app.use(bodyParser.json());
console.log("hi");
app.use('/tasks',tasksRouter)
app.use('/users',users)
app.use('/taskCnt',taskCnt)


const CONECTION_URL='mongodb+srv://rachely4631:BldhsXxIyI3GU1HC@cluster0.tmklgqs.mongodb.net/?retryWrites=true&w=majority';
const PORT=process.env.PORT || 5000;



mongoose.connect(CONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
    ()=>app.listen(PORT,()=>console.log(`server runing on port ${PORT}`)))
    .catch((error)=>console.log(error.message));

