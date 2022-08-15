const router = require('express').Router();
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

router.post('/login',async (req,res)=>{
    console.log('login route triggerred');
    const {email,password} = req.body;
    const user = await User.findOne({email: email,password:password});

    if(user){
        console.log(user);
        console.log(user._id);
        const token = jwt.sign({
            id:user._id,
            name: user.name,
            email:user.email
        },'secret123')
        res.send({message:'Login successfull', token:token})
    } else {
        res.send({message:'user doesnt exist'});
    }
})

router.post('/register', (req,res)=>{
    console.log('register route triggerred');
    const {name,email,password} = req.body;
    User.findOne({email:email}, (err,user)=>{
        if(user){
            res.send({message: "User already exist"});
        } else {
            const user = new User({ name, email, password});
            console.log(user);
            user.save( err=>{
                if(err){
                    res.send(err); 
                } else {
                    res.send({message:"successfully registered"});
                }
            });
        }
    })
})


module.exports = router;