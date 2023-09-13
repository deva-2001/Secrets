const express=require('express');
const router=express.Router();
const homeControl=require('../controller/home_controller');

//for production mode only
// router.get('/',homeControl.getHome);
// router.use('/api',require('./api/index'))


module.exports=router;