import {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router-dom";
import UserContext from "./UserContext";
import './Common.css';
import './ProfilePage.css';
import {Helmet} from "react-helmet";


class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false,
      redirectToTheHomePage: false,
      username: '',
    };
  }
  componentDidMount() {
    this.setState({
      username: this.context.user ? this.context.user.name : '',
    });
  }

  logout() {
    axios.post('http://localhost:3030/logout', {}, {withCredentials: true})
      .then(() => {
        this.context.checkAuth().catch(() => this.setState({redirectToTheHomePage:true}));
      });
  }
  update(ev) {
    ev.preventDefault();
    const data = {name:this.context.user.name};
    axios.post('http://localhost:3030/profile', data, {withCredentials:true})
      .then(() => this.setState({showNotification:true}));
  }
  handleOnNameChange(ev) {
    this.setState({username:ev.target.value});
    this.context.editUser({name:ev.target.value});
  }

  render () {
    return (
      <>
        <Helmet>
          <title>Forum - your profile</title>
        </Helmet>
        {this.state.redirectToTheHomePage && (
          <Redirect to={'/'} />
        )}
        <div className="ProfilePage_container">
          <h1 className="header1">Profile</h1>
          {this.state.showConfirmation && (
            <div className="ProfilePage_notifications">Your profile has been updated!</div>
          )}
          <UserContext>{({user}) => {
            if (user) {
              return (
                <>
                  <form onSubmit={ev => this.update(ev)}>
                    <input className="input_box" placeholder={'Your name'} value={this.state.username}
                           onChange={ev => this.handleOnNameChange(ev)} />
                    <button>Update profile</button>
                  </form>
                  <hr />
                  <button onClick={() => this.logout()}>Logout</button>
                </>
              );
            } else {
              return (<p>You are not logged in</p>);
            }
          }}</UserContext>
        </div>
      </>
    );
  }


}

ProfilePage.contextType = UserContext;

export default ProfilePage;