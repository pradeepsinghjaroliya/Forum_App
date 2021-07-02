import './Common.css';
import styled from "styled-components";
import axios from "axios";
import {useEffect, useState, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import UserContext from "./UserContext";
import {Helmet} from "react-helmet";

const Container = styled.div`
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 1fr 200px;
`;
const Buttons = styled.div`
  text-align:right;
`;
const PostRow = styled(Link)`
  background-color: rgba(255,255,255,.05);
  padding: 15px 15px 10px;
  display: grid;
  grid-template-columns: 30px 1fr;
  column-gap: 20px;
  border-top: 1px solid #555;
  text-decoration: none;
`;
const PostPoints = styled.div`
  color: #bbb;
  font-size: 2rem;
  text-align: right;
`;

function UserPage({match}) {

  const [userInfo,setUserInfo] = useState(null);
  const [votesInfo,setVotesInfo] = useState(null);
  const [votesTotal,setVotesTotal] = useState(0);
  const {user,checkAuth} = useContext(UserContext);
  const [redirectToTheHomePage, setRedirectToTheHomePage] = useState(false);

  function getUserInfo() {
    axios.get('http://localhost:3030/users/'+match.params.id)
      .then(response => {
        setUserInfo(response.data.user);
        setVotesInfo(response.data.votesInfo);
        let total = 0;
        response.data.votesInfo.forEach(voteRow => {
          total+= voteRow.votes_sum;
        });
        setVotesTotal(total);
      });
  }
  function logout() {
    axios.post('http://localhost:3030/logout', {}, {withCredentials: true})
      .then(() => {
        checkAuth().catch(() => setRedirectToTheHomePage(true));
      });
  }
  useEffect(() => {
    getUserInfo();
  }, []);

  if (redirectToTheHomePage) {
    return (<Redirect to={'/'} />);
  }

  return (
    <main>
      {!!userInfo && (
        <Helmet>
          <title>User: {userInfo.name} - Forum</title>
        </Helmet>
      )}
      <Container>
        <div>
          <h1 className="header1">{userInfo && userInfo.name}</h1>
          <h2 className="header2">Total points: {votesTotal}</h2>
        </div>
        <Buttons>
          {!!userInfo && !!user && parseInt(match.params.id) === user.id && (
            <>
              <Link to={'/profile'} style={{marginBottom:'10px'}}>Edit profile</Link>
              <br />
              <button onClick={() => logout()}>Logout</button>
            </>
          )}
        </Buttons>
      </Container>
      <ul>
        {votesInfo && votesInfo.map(voteInfoRow => (
          <PostRow to={'/questions/'+(voteInfoRow.parent_id || voteInfoRow.id)}>
            <PostPoints>{voteInfoRow.votes_sum}</PostPoints>
            <div>{voteInfoRow.title || voteInfoRow.content}</div>
          </PostRow>
        ))}
      </ul>
    </main>
  );
}

export default UserPage;