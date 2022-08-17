const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter = require('./Routes/userRoute');
const quizRouter = require('./Routes/quizRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// app.use('/login',loginRouter);
// app.use('/register',registerRouter);
app.use(userRouter);
app.use(quizRouter);

mongoose.connect('mongodb://localhost:27017/QuizAppDB', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}, ()=>{console.log("DB connected")});

app.listen(8000,()=>{
    console.log('app started at port 8000');
})
// console.log('hello');