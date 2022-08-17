const router = require('express').Router();
const User = require('../Models/userModel');
const Quiz = require('../Models/quizModel').Quiz;
const mongoose = require('mongoose');

router.post('/createquiz',(req,res)=>{
    console.log('create quiz route triggerred');
    const {user,title,questionArray} = req.body;
    console.log(req.body);

    const quiz = new Quiz({
        title:title,
        userId:user.id,
        isOpen:1,
        questions:questionArray
    })
    quiz.save( async (err,obj)=>{
        if(err){
            res.send(err);
        }
        console.log('quiz created successfully');
        const userinDB = await User.findOne({_id:user.id});
        console.log(userinDB);
        const newCreatedQuizzes = userinDB.createdQuizzes.map(quizObj=>quizObj);
        newCreatedQuizzes.push(obj._id);
        // console.log('newCreatedQuizzes: ' ,newCreatedQuizzes);
        await User.updateOne({_id:userinDB._id},{createdQuizzes:newCreatedQuizzes});
        
        const updatedUserinDB = await User.findOne({_id:user.id});
        console.log('updated user: ', updatedUserinDB);

        res.send({message:'quiz created successfully',quizId:obj._id});
    });
})

router.post('/getquizzes', async (req,res)=>{
    console.log('getquizzes route triggerred');
    console.log('request body at getquizzes: ',req.body);

    const {id,name,email} = req.body;
    const user = await User.findOne({ email:email });

    console.log('user: ',user);

    if(user) {
        const createdQuizArray = [];
        createdQuizArray.push('xyz');
        // bug: this map is not pushing anything into array.
        user.createdQuizzes.map((quizId,index)=>{
            Quiz.findOne({_id:quizId})
            .then((quiz)=>{
                // console.log('res: ', res);
                console.log(index);
                createdQuizArray.push('x');
                console.log('createdQuizArray: ',createdQuizArray)
            })
        })
        console.log('createdQuizArray: ' ,createdQuizArray);
        res.send({message:"created quizzes found successfully",createdQuizArray});

        // console.log('attemptedQuizArray: ' ,attemptedQuizArray);
        // res.send({createdQuizArray,attemptedQuizArray});
    } else {
        res.send({message:"User not found"});
    }
})

router.post('/joinquiz', async (req,res)=>{
    console.log('request body: ', req.body);
    try {
        // const quizId = req.body.id;
        const quizId = mongoose.Types.ObjectId(req.body.id);
        const quizData = await Quiz.findById(quizId);

        console.log('quizId: ', quizId);
        console.log('quizDatafromDB: ', quizData);
        
        if(quizData) {
            res.send({message:"quiz found", quizData:quizData});
        } else {
            res.send({message:"Incorrect quiz code"});
        }
    } catch (err) {
        res.send({message:"Incorrect quiz code", error:err});
    }
})

router.post('/submitquiz',async (req,res)=>{
    console.log('submit quiz route triggered');
    const {userId, quizId, attemptedQuestions} = req.body;
    const quiz = await Quiz.findOne({_id:quizId});
    const user = await User.findOne({_id:userId});
    const temp = user.attemptedQuizzes;
    temp.push(quizId);
    await User.updateOne({_id:userId},{$set:{attemptedQuizzes:temp}});
    
    const questionArray = quiz.questions;
    let score = 0;
    for(let i=0;i<questionArray.length;i++)
    {
        if(questionArray[i].correctIndex===attemptedQuestions[i].selectedOption){
            score++;
        }
    }
    console.log(questionArray);
    // console.log('userId: ',userId,', quizId: ',quizId);
    // console.log('user: ',user,'\n quiz: ',quiz);
    // console.log(questionArray,attemptedQuestions);
    User.remove({});
    Quiz.remove({});
    res.send({score:score});
})

module.exports = router;
