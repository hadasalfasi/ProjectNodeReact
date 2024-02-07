const mongoose=require('mongoose');

const tasksSchema=new mongoose.Schema({
    id:  Number,
    taskTypeId: Number, 
    taskName:  String, 
    taskDetails:  String,
    date: Date, 
    userId: Number,
    done: Boolean
});

module.exports=mongoose.model('tasks',tasksSchema);