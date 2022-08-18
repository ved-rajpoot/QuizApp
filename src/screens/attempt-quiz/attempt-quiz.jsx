import React, {useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import LoadingScreen from '../loadingScreen/loadingScreen';
import { useNavigate } from 'react-router-dom';
import Result from '../../components/result/result';

const AttemptQuiz = () => {
    const navigate = useNavigate();
    const { quizcode } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [attemptedQuestions, setattemptedQuestions] = useState([]);
    const [loading,setLoading] = useState(true);
    const [score,setScore] = useState();

    const fetchQuizData = async ()=>{
        console.log('quizcode from params: ',quizcode);
        const req = {id:quizcode};
        const res = await axios.post('http://localhost:8000/joinquiz',req);
        console.log('response of get joinquiz ', res.data.quizData);
        setQuizData(res.data.quizData);   
    }
    useEffect(()=>{
        try{
            console.log('quizData: ', quizData.questions);
            const temp = quizData.questions.map((question,index)=>{
                return {
                    id:question.qid,
                    title:question.title,
                    selectedOption:0
                }
            })
            setattemptedQuestions(temp);
            console.log('temp: ', temp);
            console.log('attemptedQuestions: ',attemptedQuestions);
        } catch (err) {
            console.log(err);
        }
        if(quizData!=null) setLoading(false);
    },[quizData]);

    useEffect(()=>{
        console.log('attemptedQuestions: ', attemptedQuestions);
    },[attemptedQuestions]);

    useEffect(()=>{
        fetchQuizData();
    },[])

    const submitQuiz = async ()=>{
        const User = jwtDecode(localStorage.getItem('token'));
        const quizId = quizcode;
        const res = await axios.post('http://localhost:8000/submitquiz',{userId:User.id,quizId,attemptedQuestions});
        console.log(res);
        setScore(res.data.score);
    }
    const handleOptionSelect = (e,qusIndex,optionIndex)=>{
        const selectedOption = optionIndex + 1;
        const temp = [...attemptedQuestions];
        temp[qusIndex].selectedOption = selectedOption;
        setattemptedQuestions(temp);

        console.log('selectedOption: ', selectedOption);
        console.log('attemptedQuestions: ', attemptedQuestions);
    }
    if(score!=null) return <Result score={score}/>
    return (
      loading?<LoadingScreen/>:  
      <div>
          <div>
            <h1>Quizcode: {quizcode}</h1>
            <h2>{quizData.title}</h2>
            {
                quizData.questions.map((qus,qusIndex)=>{
                    return (
                        <div key={qusIndex}>
                            <h3>{qus.title}</h3>
                            {
                                qus.answers.map((option,optionIndex)=>{
                                    return(
                                        <div key={optionIndex}>
                                            {/* bug: change the type of input checkbox to only one select */}
                                            <input type="checkbox" onChange={(e)=>handleOptionSelect(e,qusIndex,optionIndex)}/>
                                            <span>{option}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
          </div>
          <button onClick={submitQuiz}>Submit</button>
      </div>
    )
}

export default AttemptQuiz;