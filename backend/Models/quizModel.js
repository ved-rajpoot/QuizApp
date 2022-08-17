const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    userId:String,
    title: String,
    isOpen: Boolean,
    questions:[{
        title:String,
        answers:[String],
        correctIndex:Number    
    }],
    responses:[]
});
const Quiz = new mongoose.model("Quiz",quizSchema);
module.exports = {Quiz,quizSchema};