import {useEffect,useState} from 'react';
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Tag from "./Tag";
import WhoAndWhen from "./WhoAndWhen";
import UserLink from "./UserLink";
import VotingButtons from "./VotingButtons";
import Comments from "./Comments";
import PostBodyTextarea from "./PostBodyTextarea";
import When from "./When";
import {Helmet} from "react-helmet";
import './Common.css';
import './QuestionPage.css';

function QuestionPage({match}) {
  const [question,setQuestion] = useState(false);
  const [answerBody,setAnswerBody] = useState('');
  const [tags,setTags] = useState([]);
  const [userVote,setUserVote] = useState(0);
  const [voteCount,setVoteCount] = useState(0);
  const [questionComments,setQuestionComments] = useState([]);
  const [answersComments,setAnswersComments] = useState([]);
  const [answers,setAnswers] = useState([]);

  function getQuestion() {
    axios.get('http://localhost:3030/questions/'+match.params.id, {withCredentials:true})
      .then(response => {
        setQuestion(response.data.question);
        const voteSum = response.data.question.vote_sum;
        setVoteCount(voteSum === null ? 0 : voteSum);
        setUserVote(response.data.question.user_vote);
        setTags(response.data.tags);
      })
      .catch(e =>{
        console.log("error spotted...");
        console.log(e);
      });
  }
  function getQuestionComments() {
    axios.get('http://localhost:3030/posts/comments/'+match.params.id, {withCredentials:true})
      .then(response => {
        setQuestionComments(response.data);
      }).catch(e =>{
        console.log("error spotted ...");
        console.log(e);
      });
  }
  function getAnswersComments(answers) {
    const ids = answers.map(answer => answer.id).join(',');
    axios.get('http://localhost:3030/posts/comments/'+(ids), {withCredentials:true})
      .then(response => {
        setAnswersComments(response.data);
      });
  }
  function getAnswers() {
    axios.get('http://localhost:3030/posts/answers/'+match.params.id, {withCredentials:true})
      .then(response => {
        setAnswers(response.data);
        getAnswersComments(response.data);
      }).catch(e =>{
        console.log("error spotted...");
        console.log(e);
      });
  }
  function postAnswer(ev) {
    ev.preventDefault();
    const data = {postId: question.id, content: answerBody, type:'answer'};
    axios.post('http://localhost:3030/posts', data, {withCredentials:true})
      .then(response => {
        setAnswerBody('');
        setAnswers(response.data);
      });
  }
  useEffect(() => {
    getQuestion();
    getAnswers();
    getQuestionComments();
  },[]);
  return (
    <>
      <div className="QuestionPage_container">
        {question && (
          <>
            <Helmet>
              <title>{question.title} - Forum</title>
            </Helmet>
            <h1 className="header1 QuestionTitle" >{question.title}</h1>
            <div className="QuestionPage_postbody">
              <VotingButtons style={{marginTop:'10px'}}
                             initialTotal={voteCount}
                             initialUserVote={userVote}
                             postId={question.id} />
              <div>
                <ReactMarkdown plugins={[gfm]} children={question.content} />
                <div className="QuestionMeta" >
                  <div>
                    {tags.map(tag => (
                      <Tag key={'tag'+tag.id} name={tag.name} />
                    ))}
                  </div>
                  <WhoAndWhen><When>{question.created_at}</When> <UserLink>{question.name || question.email}</UserLink></WhoAndWhen>
                </div>
              </div>
            </div>
          </>
        )}

        {questionComments && (
          <Comments initialComments={questionComments} postId={question.id} />
        )}


        {answers.map(answer => (
          <div>
            <hr/>
            <div className="QuestionPage_postbody">
              <VotingButtons style={{marginTop:'10px'}}
                             initialTotal={answer.votes_sum}
                             initialUserVote={answer.user_vote}
                             postId={answer.id} />
              <div>
                <ReactMarkdown plugins={[gfm]} children={answer.content} />
                <WhoAndWhen style={{float:'none',width:'100%'}}>
                  <When>{answer.created_at}</When>&nbsp;
                  <UserLink id={answer.author_id}>{answer.user_name || answer.email}</UserLink>
                </WhoAndWhen>
              </div>
            </div>
            <Comments
              initialComments={answersComments.filter(comment => comment.parent_id === answer.id)}
              postId={answer.id} />
          </div>
        ))}

        <hr/>
        <h2 className="header2" style={{margin:'30px 0 20px'}}>Your Answer</h2>
        <PostBodyTextarea 
          value={answerBody}
          placeholder={'Your answer goes here. You can use markdown'}
          handlePostBodyChange={value => setAnswerBody(value)} />
        <button className="qnpagebtn" onClick={ev => postAnswer(ev)}>Post your answer</button>
      </div>
    </>
  );
}

export default QuestionPage;