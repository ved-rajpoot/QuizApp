const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const loginRouter = require('./Routes/loginRoute');
const registerRouter = require('./Routes/registerRoute');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// app.use('/login',loginRouter);
// app.use('/register',registerRouter);
app.use(loginRouter);
app.use(registerRouter);

mongoose.connect('mongodb://localhost:27017/myLoginRegisterDB', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}, ()=>{console.log("DB connected")});

app.listen(8000,()=>{
    console.log('app started at port 8000');
})
