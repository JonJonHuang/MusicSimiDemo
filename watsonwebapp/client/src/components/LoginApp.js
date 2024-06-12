import React, {Component} from 'react';
import axios from 'axios';

class LoginApp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      num_wrong_logins: 0
    }
  }

  setEmail = (e) => {
    this.setState({email: e.target.value});
  }

  setPassword = (e) => {
    this.setState({password: e.target.value});
  }

  submitHandler = async (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      // User has failed to fill in one of the required inputs.
    } else {
      let response = await axios.post('/login', {email: this.state.email, password: this.state.password});
      if (response.data.success) {
        // Change the auth state
        this.props.setAuth(true, this.state.email, response.data.username, response.data.messages);
        this.setState({
          num_wrong_logins: 0,
          email: '',
          password: ''
        })
      } else {
        this.setState(
          {num_wrong_logins: this.state.num_wrong_logins + 1}
        )
      }
    }
  }

  render() {
    if (this.props.auth) {
      return (
        <form className='login-widget' onSubmit={this.props.logoffHandler} >
          <label>Logged in as:</label>
          <br />
          <label className='login-title'>{this.props.current_user}</label>
          <br />
          <input className='logout-button' type='submit' value='Logoff' />
        </form>
      );
    } else {
      return (
        <form className='login-widget' onSubmit={this.submitHandler}>
          <label className='login-title'>Login</label>
          <br />
          <label>Current user: {this.props.current_user}</label>
          <br />
          <label>Email*: <br /><input type='text' value={this.state.email} onChange={this.setEmail} /></label>
          <br />
          <label>Password*: <br /><input type='password' value={this.state.password} onChange={this.setPassword} /></label>
          <br />
          <DisplayWrongLoginAttempt num_wrong_logins={this.state.num_wrong_logins}/>
          <input className='login-button' type='submit' value='Login' />
        </form>
      );
    }
  }

}

const DisplayWrongLoginAttempt = ({ num_wrong_logins }) =>  {
  if (num_wrong_logins > 0) {
    return(
      <label>
        Invalid email or password! Attempt #{num_wrong_logins}
      </label>
    )
  } else {
    return(<label></label>)
  }
}

export default LoginApp;
