import React from 'react'
import { useState } from 'react'

const CreateQuiz = () => {
  const [title,setTitle] = useState('');
  const [questionArray,setQuestionArray] = useState([{title:"what is your name"},{title:"how are you"},{title:"hello dude"}]);
  // const [questionArray,setQuestionArray] = useState([]);


  return (
    <div>
      <input type="text" name="title"/>
      <button>Add Question</button>
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