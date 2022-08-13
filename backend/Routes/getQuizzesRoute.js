const router = require('express').Router();
const User = require('../Models/userModel');

router.get('/getquizzes', async (req,res)=>{
    console.log('createdquiz route triggerred');
    // console.log(req.body);
    const {id,name,email} = req.body;
    console.log(email);
    const user = await User.findOne({email: email });

    if(user) {
        console.log(user);
        const createdQuizzes = user.createdQuizzes;
        const attemptedQuizzes = user.attemptedQuizzes;
        res.send({createdQuizzes,attemptedQuizzes});
    } else {
        res.send({message:"User not found"});
    }

})
module.exports = router;