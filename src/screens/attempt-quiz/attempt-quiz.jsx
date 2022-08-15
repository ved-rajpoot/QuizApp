import React, {useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AttemptQuiz = () => {
    const { quizcode } = useParams();
    useEffect(()=>{
        const fetchQuizData = async ()=>{
            console.log('quizcode from params: ',quizcode);
            const quizData = await axios.get('http://localhost:8000/joinquiz',{id:quizcode});
            console.log(quizData);
        }
        fetchQuizData();
    },[])
    return (
      <div>
          <div>{quizcode}</div>
          <div>Attempt-quiz</div>
          <button>Submit</button>
      </div>
    )
}

export default AttemptQuiz;