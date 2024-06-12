import React, { Component } from 'react';

class ConversationApp extends Component {
  render() {
    return (
      <React.Fragment>
        <Title />
        <MessageList
          messages = {this.props.messages}
        />
        <SendMessageForm
          value={this.props.current_input}
          onChange={() => this.props.onChange()}
          onKeyPress={() => this.props.onKeyPress()}
        />
      </React.Fragment>
    );
  }
  
  componentDidMount() {
    this.props.scrollDown()
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
                isWatson={message.isWatson}
              />
              <br/>
            </React.Fragment>
          )
        })}
      </div>
    )
  }
}

function SendMessageForm(props) {
  return(
    <input
      className="send-message-form"
      type="text"
      value={props.value}
      onChange={props.onChange()}
      placeholder="Type in complete sentences here..."
      onKeyPress={props.onKeyPress()}
    />
  );
}

function Title() {
  return(
    <p className="title">Conversation with Watson</p>
  )
}

function MessageItem(props) {
  return (
    <div className={props.isWatson ? 'message-item plain' : 'message-item color'}>
      <div className="message-sender">{props.senderId}</div>
      <div className="message-text"><span>{props.message}</span></div>
    </div>
  );
}

export default ConversationApp;