const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: String,
    isOpen: Boolean,
    questions:[String],
    responses:[]
});
const quiz = new mongoose.model("Quiz",quizSchema);
module.exports = {quiz,quizSchema};