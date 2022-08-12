const router = require('express').Router();
const User = require('../Models/userModel');

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