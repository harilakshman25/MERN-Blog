const User=require('../models/User');
const jwt=require('jsonwebtoken');

//Register User
exports.register=async(req,res)=>{
     const {username,password}=req.body;
     try{
        const existingUser=await User.findOne({username});
        if(existingUser){
           return res.status(400).json({message:'Username already exists'});
        }
        const user=new User({username,password});
        await user.save();
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'1h',
        });
        res.status(201).json({token});
     }catch (error){
        res.status(500).json({message: error.message});
     }
};

//Login User
exports.login=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await User.findOne({username});
        if(! user || ! (await user.matchPassword(password))){
            return res.status(401).json({message:'Invalid Credentials'});
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn: '1h',
        });
        res.json({token});
    }catch(error){
        res.status(500).json({message:error.message});
    }
};


