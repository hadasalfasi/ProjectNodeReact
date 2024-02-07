const express=require('express');
const router=express.Router();
const Task=require('../models/tasks');

const { addTask,getAllTasks,deleteTask,taskStatus} = require("../controllers/tasks");


router.get('/',getAllTasks);
router.delete('/:Id',deleteTask);
router.post('/',addTask);
router.put('/:taskId',taskStatus);
// router.patch('/',apdateTask);

module.exports=router;