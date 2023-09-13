const express=require('express');
const router=express.Router();
const passport=require('passport')
const secretControl=require('../../../controller/secretController');

router.post('/create-secret',passport.authenticate('jwt', { session: false }),secretControl.create)
router.get('/get-secret',passport.authenticate('jwt', { session: false }),secretControl.getSecret)
router.post('/delete-secret/:id',passport.authenticate('jwt', { session: false }),secretControl.deleteSecret)


module.exports=router;
