const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: String,
    createdby:String,
    isOpen: Boolean,
    questions:[{
        qid:String,
        question:String,
        answers:[String],
        correctIndex:Number    
    }],
    responses:[]
});
const Quiz = new mongoose.model("Quiz",quizSchema);
module.exports = {Quiz,quizSchema};