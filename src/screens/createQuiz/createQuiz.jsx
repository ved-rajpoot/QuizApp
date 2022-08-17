import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateQuiz = ({ user }) => {
  
  const navigate = useNavigate();

  const [title,setTitle] = useState('');
  const [questionArray,setQuestionArray] = useState([
    {
      title:"what is your name ?",
      answers:["hii","hello","ha haa haa","hiss huss"],
      correctIndex:1    
    },{
        title:"How are you ?",
        answers:["hii","hello","ha haa haa","hiss huss"],
        correctIndex:2    
    },{
        title:"what is your name ?",
        answers:["hii","hello","ha haa haa","hiss huss"],
        correctIndex:3    
    },{
        title:"hee huu hii hajsk ?",
        answers:["hii","hello","ha haa haa","hiss huss"],
        correctIndex:4   
    },{
        title:"halo hii how vkdj ?",
        answers:["hii","hello","ha haa haa","hiss huss"],
        correctIndex:1    
    },
  ]);
  const [quizCode,setQuizcode] = useState(null);
  // const [questionArray,setQuestionArray] = useState([]);

  const createQuiz = async ()=>{
    console.log(user);
    const quiz = {user,title,questionArray};
    console.log('user: ',user);
    console.log('quiztitle: ',title);
    console.log('questionArray: ',questionArray);
    const res = await axios.post('http://localhost:8000/createquiz',quiz)
    console.log('quizId: ',res.data.quizId);
    setQuizcode(res.data.quizId);
    console.log('quizcode: ',quizCode);
    // bug: not setting quizCode, its always null
    console.log(`/created-successfully/${quizCode}`,quizCode);
    
  }

  useEffect(()=>{
    console.log('quizCode: ', quizCode);
    if(quizCode!=null) {
      navigate(`/created-successfully/${quizCode}`);
    }
  },[quizCode]);
  useEffect(()=>{
    console.log('page refreshed');
  },[])

  return (
    <div>
      <input type="text" name="title"  value={title} onChange= {e=>setTitle(e.target.value)}/>
      <button>Add Question</button>
      <button onClick={createQuiz}>Create Quiz</button>
      <ul>
        {
          questionArray.map((qus,index)=>{
            return <li key={index}>{qus.title}</li>
          })
        }
      </ul>
    </div>
  )
}

export default CreateQuiz;