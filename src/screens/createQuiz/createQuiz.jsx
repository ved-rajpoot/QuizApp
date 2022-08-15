import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateQuiz = ({ user }) => {
  
  const navigate = useNavigate();

  const [title,setTitle] = useState('');
  const [questionArray,setQuestionArray] = useState([{question:"what is your name",qid:1},{question:"how are you,qid:2"},{question:"hello dude",qid:3}]);
  const [quizCode,setQuizcode] = useState('');
  // const [questionArray,setQuestionArray] = useState([]);

  const createQuiz = async ()=>{
    console.log(user);
    const quiz = {user,title,questionArray};
    console.log('user: ',user);
    console.log('quiztitle: ',title);
    console.log('questionArray: ',questionArray);
    const res = await axios.post('http://localhost:8000/createquiz',quiz)
    console.log('quizId: ',res.data.quizId);
    // setQuizcode(res.data.quizId);
    setQuizcode('abcd');
    console.log('quizcode: ',quizCode);
    console.log(`/created-successfully/${quizCode}`,quizCode);
    navigate(`/created-successfully/${quizCode}`);
  }

  // useEffect(()=>{
  //   console.log(title);
  // },[title]);

  return (
    <div>
      <input type="text" name="title"  value={title} onChange= {e=>setTitle(e.target.value)}/>
      <button>Add Question</button>
      <button onClick={createQuiz}>Create Quiz</button>
      <ul>
        {
          questionArray.map((qus,index)=>{
            return <li>{qus.question}</li>
          })
        }
      </ul>
    </div>
  )
}

export default CreateQuiz;