import React from 'react';
import axios from 'axios';

const titleStyle = {
  fontSize: '30px'
}

const inputStyle = {
  width: '300px'
}

class RegisterApp extends React.Component {

  emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  constructor() {
    super();
    
    this.state = {
      require_email_veri: false,
      email: '',
      emailStatus: 'X',
      password: '',
      passwordStatus: 'X',
      username: '',
      errMsg: ''
    }
  }
  
  setEmail = (e) => {
    if (this.emailRegex.test(e.target.value)) {
      this.setState({emailStatus: '\u2714'});
    } else {
      this.setState({emailStatus: 'X' });
    }
    this.setState({email: e.target.value});
  }
  
  setPassword = (e) => {
    if (e.target.value.length >= 8) {
      this.setState({passwordStatus: '\u2714'});
    } else {
      this.setState({passwordStatus: 'X'});
    }
    this.setState({password: e.target.value});
  }
  
  setUsername = (e) => {
    this.setState({username: e.target.value});
  }
  
  submitHandler = async (e) => {
    e.preventDefault();
    if (this.state.passwordStatus !== '\u2714' || this.state.emailStatus !== '\u2714') {
      return;
    }
    if (!this.state.email || !this.state.password || !this.state.username) {
      // User has failed to fill in one of the required inputs.
      console.log("missing parameters")
    } else {
      console.log("need to register user here")
      let response = await axios.post('/register', {email: this.state.email,
                                                    username: this.state.username,
                                                    password: this.state.password});
      if (response.data.success) {
        console.log("success!")
        this.setState({
          errMsg: "Successfully created new user! Please log in above."
        })
      } else {
        console.log("failure!")
        this.setState({
          errMsg: "Error: email already exists!"
        })
      }
    }
  }
  
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <label style={titleStyle} className='login-title'>Create a New User</label>
        <br />
        <label>
          Display name, or user name*:
          <br />
          <input style={inputStyle} type='text' value={this.state.username} onChange={this.setUsername} />
        </label>
        <br />
        <label>
          Email*:
          <br />
          <input style={inputStyle} type='text' value={this.state.email} onChange={this.setEmail} />
        </label>
        <br />
        <label>
          Password*:
          <br />
          <input style={inputStyle} type='password' value={this.state.password} onChange={this.setPassword} />
          <p className='registration-criteria'>{this.state.emailStatus} Valid email</p>
          <p className='registration-criteria'>{this.state.passwordStatus} At least 8 characters</p>
          <p>{this.state.errMsg}</p>
        </label>
        <br />
        <input className='login-button' type='submit' value='Create User' />
      </form>
    );
  }
}

export default RegisterApp;