const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req,res)=>{
    try{
        const userExists = await User.findOne({email: req.body.email.toLowerCase()});
        if(userExists){
            return res.status(403).send({
                success:false,
                message:'User already exists'
            })
        }
    
        const salt  = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(req.body.password,salt)
        req.body.password =hasedPassword 
        req.body.email = req.body.email.toLowerCase()
        const newUser = new User(req.body)
        await newUser.save()
    
        res.status(200).send({
            success:true,
            message:'Registration Successfully'
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Something went wrong ,Please check logs'
        })
    }
}


const loginUser = async (req, res) => {
    const user  = await User.findOne({email:req.body.email.toLowerCase()})

    if(!user){
        return res.status(403).send({
            success:false,
            message:"User Doesn't exits"
        })
    }

    const validPassword = await bcrypt.compare(req.body.password,user.password)

    if(!validPassword){
        return res.status(401).send({
            success:false,
            message:"Invalid Password"
        })
    }
    const token = jwt.sign({userId:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.status(200).send({
        success:true,
        message:'User Logged In',
        data:token
    })
}


const getCurrentUser = async (req, res) => {
try{
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "User details fetched successfully",
      data: user,
    })
}
catch(err){
    res.status(500).send({
        success:false,
        message:err.message
    })
}
}


module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
}