const router = require('express').Router();
const User = require('../Models/userModel');
const Quiz = require('../Models/quizModel').Quiz;

router.get('/getquizzes', async (req,res)=>{
    console.log('createdquiz route triggerred');
    // console.log(req.body);
    const {id,name,email} = req.body;
    console.log(email);
    const user = await User.findOne({email: email });

    if(user) {
        console.log(user);
        // const createdQuizzes = user.createdQuizzes;
        // const attemptedQuizzes = user.attemptedQuizzes;
        const createdQuizzes = user.createdQuizzes.map((quizId,index)=>{
            const quiz = Quiz.findOne({_id:quizId});
            return quiz;
        })
        const attemptedQuizzes = user.attemptedQuizzes.map((quizId,index)=>{
            const quiz = Quiz.findOne({_id:quizId});
            return quiz;
        })
        res.send({createdQuizzes,attemptedQuizzes});
    } else {
        res.send({message:"User not found"});
    }

})
module.exports = router;