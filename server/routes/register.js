const express=require('express')
const router=express.Router()
const registerController=require('../controllers/registerController')

router.get('/', registerController.getregisterpage)
router.post('/', registerController.postregisterpage)

module.exports=router