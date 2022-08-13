const router = require('express').Router();
const User = require('../Models/userModel');
const jwt = require('jsonwebtoken');

router.post('/login',async (req,res)=>{
    console.log('login route triggerred');
    const {email,password} = req.body;
    const user = await User.findOne({email: email,password:password});

    if(user){
        console.log(user);
        const token = jwt.sign({
            name: user.name,
            email:user.email
        },'secret123')
        res.send({message:'Login successfull', token:token})
    } else {
        res.send({message:'user doesnt exist'});
    }
})
module.exports = router;