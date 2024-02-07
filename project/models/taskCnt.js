const mongoose=require('mongoose');

const taskCntSchema=new mongoose.Schema(
    {
        id:Number,
        cnt:Number
    }
);

module.exports=mongoose.model('taskCnt',taskCntSchema);