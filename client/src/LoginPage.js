import {Component} from 'react';
import './Common.css';
import axios from 'axios';
import UserContext from "./UserContext";
import {Redirect} from 'react-router-dom';
import {Helmet} from "react-helmet";
import './LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToHomePage: false,
      error: false,
    }
  }

  login(ev) {
    ev.preventDefault();
    axios.post('http://localhost:3030/login', {
      email: this.state.email,
      password: this.state.password,
    }, {withCredentials: true})
      .then(() => {
        this.context.checkAuth().then(() => {
          this.setState({error:false,redirectToHomePage: true});
        });
      })
      .catch(() => this.setState({error:true}));
  }
  render() {
    return (<>
      <Helmet>
        <title>Forum - login</title>
      </Helmet>
      {this.state.redirectToHomePage && (
        <Redirect to={'/'} />
      )}
      <div className="Login_container">
        <h1 className="header1" style={{marginBottom:'20px'}}>Login</h1>
        {this.state.error && (
          <div className="ErrorBox" >Login failed</div>
        )}
        <form className="loginforum" onSubmit={ev => this.login(ev)}>
          <input className="input_box" id="login_input" placeholder={'email'} type="email" value={this.state.email}
                 onChange={ev => this.setState({email:ev.target.value})} />
          <input className="input_box" id="login_input" placeholder={'password'} type="password" value={this.state.password}
                 onChange={ev => this.setState({password:ev.target.value})} />
          <button className="Loginbtn" type={'submit'}>Login</button>
        </form>
      </div>
    </>);
  }

}

LoginPage.contextType = UserContext;

export default LoginPage;