const studentsmodel=require('../models/studentsmodel')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')

 

module.exports.getregisterpage=async (req, res)=>{
    res.render("register",{layout:false})
}

module.exports.postregisterpage=async (req, res)=>{
    try {
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        const data={
        fullname:req.body.fullname,
        email:req.body.email,
        password:hashedPassword,
            }
        const existingStudent = await studentsmodel.findOne({ email:req.body.email });

    if (existingStudent) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    console.log(data)
    const newStudent=new studentsmodel(data)
    await newStudent.save()
    res.redirect('/login')
    
    } catch (error) {
        console.log(error)
        res.redirect('/register')
    }
    

   
}  