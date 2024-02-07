const express=require('express');
const router=express.Router();
const taskCnt=require('../models/taskCnt');

const {updateCnt,getCnt} = require("../controllers/taskCnt");


router.get('/',getCnt);
router.put('/',updateCnt)

module.exports=router;