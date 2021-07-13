import {useState,useEffect} from 'react';
import QuestionRow from "./QuestionRow";
import axios from "axios";
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';
import './Common.css';


function QuestionsPage() {
  const [questions,setQuestions] = useState([]);
  function fetchQuestions() {
    axios.get('http://localhost:3030/questions', {withCredentials:true})
      .then(response => setQuestions(response.data));
  }
  useEffect(() => fetchQuestions(), []);
  return (
    <main>
      <Helmet>
        <title>Forum - home</title>
      </Helmet>
      <div className="HeaderRow" >
        <h1 className="header1" style={{margin:0}}>Questions</h1>
        <Link to={'/ask'} className="qplink">Ask&nbsp;Question</Link>
      </div>
      {questions && questions.length > 0 && questions.map(question => (
        <QuestionRow
          title={question.title}
          id={question.id}
          key={question.id}
          createdAt={question.created_at}
          author={{id: question.user_id, name:question.name, email:question.email}}
          tags={question.tags} />
      ))
      }
    </main>
  );
}

export default QuestionsPage;