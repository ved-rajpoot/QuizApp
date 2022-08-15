const router = require('express').Router();
const User = require('../Models/userModel');
const Quiz = require('../Models/quizModel').Quiz;

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

router.get('/getquizzes', async (req,res)=>{
    console.log('getquizzes route triggerred');
    console.log('request body at getquizzes: ',req.body);

    const {id,name,email} = req.body;
    const user = await User.findOne({ email:email });

    console.log('user: ',user);

    if(user) {
        let createdQuizArray = [];
        user.createdQuizzes.map((quizId,index)=>{
            // Quiz.findOne({_id:quizId}).then((res)=>{
            //     console.log(res);
            //     createdQuizArray.push(res);
            // });
            // console.log(quiz);
            const res = async ()=>{
                const quiz = await Quiz.findOne({_id:id});
                return quiz;
            }
            createdQuizArray.push(res);
        })
        console.log('createdQuizArray: ' ,createdQuizArray);
        // console.log('attemptedQuizArray: ' ,attemptedQuizArray);
        res.send(createdQuizArray);
        // res.send({createdQuizArray,attemptedQuizArray});
    } else {
        res.send({message:"User not found"});
    }
})

module.exports = router;