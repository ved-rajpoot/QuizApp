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

  const createQuiz = ()=>{
    console.log(user);
    const quiz = {user,title,questionArray};
    axios.post('http://localhost:8000/createquiz',quiz)
    .then((res)=>{
      setQuizcode(res.data.quizId);
      console.log('quizId: ',res.data.quizId);
      navigate(`/created-successfully/${quizCode}`);
    })
    .catch(err=>console.log(err));
    // console.log('quizcode: ',quizcode);
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