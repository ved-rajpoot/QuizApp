const mongoose = require("mongoose")
const quizSchema = require('./quizModel').quizSchema;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password : String,
    createdQuizzes: [quizSchema],
    attemptedQuizzes: [quizSchema]
})
const User = new mongoose.model("user", userSchema);
module.exports = User;