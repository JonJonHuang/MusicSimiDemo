import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import posed from 'react-pose';

import LoginForm from './LoginPage';

const DUMMY_DATA = [
  {
    senderId: "Watson",
    text: "Hello, I'm Watson. How can I help you today?"
  }
];

const PERSONALITIES_DEFAULT = [
  {
    personality: 'Openness',
    percentage: 43
  },
  {
    personality: 'Conscientiousness',
    percentage: 80
  },
  {
    personality: 'Extraversion',
    percentage: 24
  },
  {
    personality: 'Agreeableness',
    percentage: 59
  },
  {
    personality: 'Emotional range',
    percentage: 71
  },
  {
    personality: 'Desire for Challenge',
    percentage: 66
  },
  {
    personality: 'Desire for Closeness',
    percentage: 78
  },
  {
    personality: 'Conservation, Value',
    percentage: 32
  },
  {
    personality: 'Curiosity',
    percentage: 23
  },
  {
    personality: 'Harmony',
    percentage: 69
  },
  {
    personality: 'Stability',
    percentage: 72
  },
  {
    personality: 'Structure',
    percentage: 75
  },
  {
    personality: 'Excitement',
    percentage: 24
  },
  {
    personality: 'Open to Change',
    percentage: 46
  },
  {
    personality: 'Liberty',
    percentage: 65
  }
];

const PERSONALITIES_STEPHEN = [
  {
    personality: 'Openness',
    percentage: 56
  },
  {
    personality: 'Conscientiousness',
    percentage: 75
  },
  {
    personality: 'Extraversion',
    percentage: 94
  },
  {
    personality: 'Agreeableness',
    percentage: 64
  },
  {
    personality: 'Emotional range',
    percentage: 68
  },
  {
    personality: 'Desire for Challenge',
    percentage: 70
  },
  {
    personality: 'Desire for Closeness',
    percentage: 74
  },
  {
    personality: 'Conservation, Value',
    percentage: 44
  },
  {
    personality: 'Curiosity',
    percentage: 36
  },
  {
    personality: 'Harmony',
    percentage: 60
  },
  {
    personality: 'Stability',
    percentage: 65
  },
  {
    personality: 'Structure',
    percentage: 71
  },
  {
    personality: 'Excitement',
    percentage: 46
  },
  {
    personality: 'Open to Change',
    percentage: 51
  },
  {
    personality: 'Liberty',
    percentage: 24
  }
];

class MainApp extends Component {
  constructor() {
    super()
    console.log("***********************")
    var username_temp = 'default_user';
    var personality_set = PERSONALITIES_DEFAULT;
    if (username_temp==='stephmcflurry') {
      personality_set = PERSONALITIES_STEPHEN;
    }
    this.state = {
      personalities: personality_set
    }
    
    this.state = {
      page: 1,
      messages: DUMMY_DATA,
      auth: false,
      wsfEmail: '',
      username: username_temp,
      personalities: personality_set
    };
    if (localStorage.wsfEmail) {
      this.checkAuth(localStorage.wsfEmail);  
    }
    this.handleChangeInMessages = this.handleChangeInMessages.bind(this)
  }
  
  render() {
    var appToRender = " "
    switch(this.state.page) {
      case 1:
        appToRender = <HomeApp />
        break;
      case 2:
        appToRender = <ConversationApp messages = {this.state.messages} onChange={() => this.handleChangeInMessages} wsfEmail={this.state.wsfEmail} />
        break
      case 3:
        appToRender = <PersonalityApp personalities={this.state.personalities} username={this.state.username} />
        break;
      case 4:
        appToRender = <><LoginForm setAuth={this.setAuth} /><br /><p>Current user: {this.state.username}</p></>;
        break;
      default:
        appToRender = <HomeApp />
    }
    return (
      <React.Fragment>
        <div className="side-nav">
          <a onClick={() => this.setState({page: 1})} >Home</a>
          <br/>
          <a onClick={() => this.setState({page: 2})} >Conversation with Watson</a>
          <br/>
          <a onClick={() => this.setState({page: 3})} >Personality and Matches</a>
          <br/>
          <a onClick={() => this.setState({page: 4})} >Login</a>
        </div>
        <div className="main-content">
          {appToRender}
        </div>
      </React.Fragment>
    )
  }
  
  handleChangeInMessages(e) {
    console.log("inside handleChangeInMessages");
    console.log(e);
    this.setState({
      messages: e.target.value
    });
  }

  /**
   * Asks the Express server whether this user is logged in or not. If so, then updates the state to reflect that.
   */
  checkAuth = async (email) => {
    let response = await axios.post('/check-auth', {email: email});
    if (response.data.success) {
      this.setAuth(true, email, response.data.username);
    } else {
      this.setAuth(false, '', '');
    }
  }

  setAuth = (authStatus, email, username) => {
    let newState = {...this.state, auth: authStatus, username: username, wsfEmail: email};
    localStorage.wsfEmail = email;
    this.setState(newState);
  }

}

class ConversationApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      current_input: ''
    }
    this.handleChangeXXX = this.handleChangeXXX.bind(this)
    this.handleKeyPressXXX = this.handleKeyPressXXX.bind(this)
  }

  render() {
    return (
      <React.Fragment>
        <Title />
        <MessageList
          messages = {this.state.messages}
          onChange = {this.props.onChange()}
        />
        <SendMessageForm
          value={this.state.current_input}
          onChange={() => this.handleChangeXXX}
          onKeyPress={() => this.handleKeyPressXXX}
        />
      </React.Fragment>
    );
  }
  
  handleChangeXXX(e) {
    // on change, update the state's message
    this.setState({
      current_input: e.target.value
    })
  }
  
  handleKeyPressXXX(e) {
    // 13 is the charCode for the Enter key
    if (e.charCode === 13 && this.state.current_input.length > 0) {
      
      this.addMessageToList(this.props.username, this.state.current_input)
      
      this.sendPostRequest()
    }
  }

  async sendPostRequest() {
    // TODO: change the user from "Jon" to the logged-in user
    const foo = {
      email: this.props.wsfEmail,
      text: this.state.current_input
    };
    let response = await axios.post('/conversation', foo );
    this.addMessageToList('Watson', response.data[0]);
  }

  addMessageToList(senderId, text) {
    // update messages; clear current_input
    const messages_copy = this.state.messages.slice();
    messages_copy.push({senderId: senderId, text: text})
    this.setState({
      messages: messages_copy,
      current_input: ''
    }, function() {
      // scroll to bottom of message-list
      var messageList = document.getElementsByClassName("message-list")[0];
      messageList.scrollTop = messageList.scrollHeight;
    })
    
  }

}

class MessageList extends React.Component {
  render() {
    return (
      <div className="message-list" >
        {this.props.messages.map(message => {
          return (
            <React.Fragment>
              <MessageItem
                senderId={message.senderId}
                message={message.text}
              />
              <br/>
            </React.Fragment>
          )
        })}
      </div>
    )
  }
  
}

class MessageItem extends Component {
  render() {
    return (
      <div className={this.props.senderId === 'Watson'? 'message-item plain' : 'message-item color'}>
        <div className="message-sender">{this.props.senderId}</div>
        <div className="message-text"><span>{this.props.message}</span></div>
      </div>
    );
  }
}

function SendMessageForm(props) {
  return(
    <input
      className="send-message-form"
      type="text"
      value={props.value}
      onChange={props.onChange()}
      onKeyPress={props.onKeyPress()}
    />
  );
  
}

function Title() {
  return(
    <p className="title">Conversation with Watson</p>
  )
}

class PersonalityApp extends React.Component {
  render() {
    var match_text = (
      <>
      <p>You have a match with aa! You matched based on similarities of these qualities:</p>
      <ul>
        <li>Desire for Closeness</li>
        <li>Desire for Challenge</li>
        <li>Emotional Range</li>
      </ul>
      </>
    )
    var no_match_text = (
      <p>Still searching for a match for you...</p>
    )
    return(
      <div>
        <h1>Personality Chart</h1>
        <Graph personalities={this.props.personalities} />
        {this.props.username==='stephmcflurry'? match_text : no_match_text }
      </div>
    )
  }
}

class Graph extends React.Component {
  state = {}
  render() {
    return(
      <div className="graph-wrapper">
        <div className="graph">
        <BarTextContent personalities={this.props.personalities} />
          <div className="bar-lines-container">
            { this.renderLines() }
            { this.renderBars() }
          </div>
        </div>
      </div>
    )
  }

  renderLines() {
    return Array(10).fill(null).map((el, i) => (
      <Line
        left={i*10}
        key={i}
      />
    ))
  }

  renderBars() {
    const personalities = this.props.personalities;
    /* let sumOfValues = values.reduce((acc, item) => {
      return acc + item.percentage;
    }, 0); */
    
    return personalities.map((personality) => {
      return (
        <Bar
          percent={personality.percentage}
          key={personality.personality}
        />
      )
    });
  }

}

  const BarTextContent = ( {personalities} ) => {
    return (<div className="bar-text-content">
              {
                personalities.map((item) => (
                  <div className="text">
                    {item.personality}
                  </div>
                ))
              }
            </div>)
  }

const Box = posed.div({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
    })

class HomeApp extends React.Component {
  constructor() {
    super()
    this.state = {
      isVisible: true
    };
    this.renderBox = this.renderBox.bind(this)
  }
componentDidMount() {
    setInterval(() => {
      this.setState({ isVisible: !this.state.isVisible });
    }, 1000);
  }
  render() {
    return (
      <React.Fragment>
        <h1>Watson Speed Friending</h1>
          <p>Welcome to Watson Speed Friending, created by Jonathon Huang,
              Aakash Singh, Stephen Wan, and Ziheng Wei</p>
          <p>The "Conversation with Watson" tab will start a conversation
              with Watson to begin collecting interests and personality
              information about the user.</p>
          <p>The "User Personality" tab will display information that
              Watson has gathered from the conversation about a user's
              interests and personality.</p>
      </React.Fragment>
    )
    // {this.renderBox()}
  }

  renderBox() {
    return <Box className="box" pose={this.state.isVisible ? 'visible' : 'hidden'} />
  }
}

const Line = ({ left }) => {
  return (
    <div
      className="line"
      style={{ left: `${left}%` }}
    />
  )
}

const Bar = ({percent}) => {
  return (
    <div className="bar" style={{ width: `${percent}%` }} />
  )
}

export default MainApp;
