const express=require('express')
const router=express.Router()
const loginController=require('../controllers/loginController')

router.get('/', loginController.getloginpage)
router.post('/', loginController.postloginpage)

module.exports=router