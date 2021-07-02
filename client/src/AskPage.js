import styled from 'styled-components';
import './Common.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import ReactTags from 'react-tag-autocomplete';
import PostBodyTextarea from "./PostBodyTextarea";

const Container = styled.div`
  padding: 30px 20px;
`;
 
export default function AskPage() {

  const reactTags = React.createRef();
  console.log(reactTags);

  const [questionTitle,setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [redirect, setRedirect] = useState('');
  const [tags,setTags] = useState([]);
  const [tagSuggestions,setTagSuggestions] = useState([]);

  function sendQuestion(ev) {
    ev.preventDefault();
    axios.post('http://localhost:3030/questions', {
      title: questionTitle,
      content: questionBody,
      tags: tags.map(tag => tag.id),
    }, {withCredentials:true})
      .then(response => {
        console.log(response.data);
        setRedirect('/questions/'+response.data[0]);
      });
  }

  function getTags() {
    axios.get('http://localhost:3030/tags')
      .then(response => {
        console.log("gettags..");
        setTagSuggestions(response.data);
      })
  }

  function onTagAddition(tag) {
    console.log("till here");
    const chosenTags = tags;
    chosenTags.push(tag);
    setTags(chosenTags);
  }

  function onTagDelete(indexToDelete) {
    const newTags = [];
    for (let i=0; i<tags.length; i++) {
      if (i !== indexToDelete) { 
        newTags.push(tags[i]);
      }
    }
    setTags(newTags);
  }

  useEffect(() => {
    getTags();
    console.log("useeffect running");
  }, []);

  return (
    <Container>
      {redirect && (
        <Redirect to={redirect} />
      )}
      <h1 className="header1" style={{marginBottom:'20px'}}>Ask a public question</h1>
      <form onSubmit={ev => sendQuestion(ev)}>
        <input className="input_box" type="text"
               value={questionTitle}
               onChange={e => setQuestionTitle(e.target.value)}
               placeholder="Title of your question" />
        <PostBodyTextarea
          placeholder={"More info about your question. You can use markdown here"}
          value={questionBody}
          handlePostBodyChange={value => setQuestionBody(value)} />
        <ReactTags
          ref={reactTags}
          tags={tags}
          suggestions={tagSuggestions}
          handleDelete={ev => onTagDelete(ev)} 
          handleAddition={ev => onTagAddition(ev)} />
        <button type={'submit'}>Post question</button>
      </form>
    </Container>
  );

}