import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateQuiz = ({ user }) => {
  
  const navigate = useNavigate();

  const [title,setTitle] = useState('');
  const [questionArray,setQuestionArray] = useState([{title:"what is your name"},{title:"how are you"},{title:"hello dude"}]);
  const [quizCode,setQuizcode] = useState('');
  // const [questionArray,setQuestionArray] = useState([]);

  const createQuiz = async ()=>{
    console.log(user);
    const quiz = {user,title,questionArray};
    const res = await axios.post('http://localhost:8000/createquiz',quiz)
    console.log('quizId: ',res.data.quizId);
    // setQuizcode(res.data.quizId);
    setQuizcode('abcd');
    console.log('quizcode: ',quizCode);
    console.log(`/created-successfully/${quizCode}`,quizCode);
    navigate(`/created-successfully/${quizCode}`);
  }
  return (
    <div>
      <input type="text" name="title"/>
      <button>Add Question</button>
      <button onClick={createQuiz}>Create Quiz</button>
      <ul>
        {
          questionArray.map((qus,index)=>{
            return <li>{qus.title}</li>
          })
        }
      </ul>
    </div>
  )
}

export default CreateQuiz;