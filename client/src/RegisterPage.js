import {Component} from 'react';
import './Common.css';
import axios from 'axios';
import UserContext from "./UserContext";
import {Redirect} from 'react-router-dom';
import {Helmet} from "react-helmet";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      redirectToTheHomePage: false,
      error: false,
    }
  }

  register(ev) {
    ev.preventDefault();
    axios.post('http://localhost:3030/register', {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    }, {withCredentials: true})
      .then(() => {
        this.context.checkAuth()
          .then(() => this.setState({error:false,redirectToTheHomePage:true}));
      })
      .catch(error => {
        this.setState({error:error.response.data});
      });
  }
  render() {
    return (<>
      <Helmet>
        <title>Forum - register</title>
      </Helmet>
      {this.state.redirectToTheHomePage && (
        <Redirect to={'/'} />
      )}
      <div style={{padding:'30px 20px'}}>
        <h1 className="header1" style={{marginBottom:'20px'}}>Register</h1>
        {this.state.error && (
          <div className="ErrorBox">{this.state.error}</div>
        )}
        <form onSubmit={ev => this.register(ev)}>
          <input className="input_box" placeholder={'email'} type="email" value={this.state.email}
                 onChange={ev => this.setState({email:ev.target.value})} />
          <input className="input_box" placeholder={'your name'} type="text" value={this.state.name}
                 onChange={ev => this.setState({name:ev.target.value})} />
          <input className="input_box" placeholder={'password'} type="password" value={this.state.password}
                 autocomplete={'new-password'}
                 onChange={ev => this.setState({password:ev.target.value})} />
          <button type={'submit'}>Register</button>
        </form>
      </div>
    </>);
  }

}

RegisterPage.contextType = UserContext;

export default RegisterPage;