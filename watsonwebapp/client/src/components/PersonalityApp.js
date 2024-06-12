import React from 'react';
import axios from 'axios';
class PersonalityApp extends React.Component {
  
  constructor() {
    super();
    this.state = {
      perArr: [],
      matchArr: [],
      errMsg: ''
    }
  }
  
  render() {
    return(
      <div className='personality-app'>
        {this.state.errMsg ? <p>{this.state.errMsg}</p> : "" }
        <h1>Your Top Matches</h1>
        {this.displayTopMatches()}
        <h1>Personality Chart</h1>
        {this.displayPersonalityIntro()}
        <Graph personalities={this.state.perArr} />
      </div>
    )
  }
  
  displayPersonalityIntro() {
    const info = (
      <p>
        Below is a graph displaying your percentiles within
        each personality category.
      </p>
    )
    const noinfo = (
      <p>
        { this.state.errMsg ? "" : "Loading..."}
      </p>
    )
    if (this.state.perArr.length > 0) {
      return(info)
    } else {
      return(noinfo)
    }
  }

  displayTopMatches() {
    if (this.state.perArr.length > 0) {
      console.log(this.state.matchArr);
      return(
        <ol>
          Your top matches are shown below, in order of the overall dissimilarity score.
          The dissimilarity score represents the sum of squared differences across all
          personality traits. So, a lower dissimilarity score indicates a user with similar
          personality percentile scores.
          {this.state.matchArr.map(item => {
            return (
              <React.Fragment>
                <li>
                    <p>Username: {item[0][0]} ({item[0][1]})<br/>
                    Overall dissimilarity: {Number((item[1]).toFixed(5))}<br/>
                    Similar trait values for: {item[0][2]}, {item[0][3]}, {item[0][4]}</p>
                </li>
              </React.Fragment>
            )
            })}
        </ol>
      )
    } else {
      return(
        <p>No matches found yet...</p>
      )
    }
  }
  
  sendGetRequest = async (email) => {
    let response = await axios.get('/personality', {params: {email: email}} );
    if (response.data.message) {
      this.setState({
        errMsg: response.data.message
      })
    }
    this.setState({
      perArr: response.data.personality
    })
  }

  sendGetMatchRequest = async (email) => {
    let response = await axios.get('/match', {params: {email: email}} );
    let foo = response.data;
    this.setState({
      matchArr: foo
    })
  }
  
  componentDidMount() {
    this.sendGetRequest(this.props.email)
    this.sendGetMatchRequest(this.props.email)
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
    return personalities.map((personality) => {
      return (
        <Bar
          percent={personality.val * 100}
          key={personality.name}
        />
      )
    });
  }
}

/*
const TopMatchItem = ( {email, username, score, traits} ) => {
  return(<div className = "top-match-item">
          
  </div>)
}
*/

const BarTextContent = ( {personalities} ) => {
    return (<div className="bar-text-content">
              {
                personalities.map((item) => (
                  <div className="text">
                    {item.name}
                  </div>
                ))
              }
            </div>)
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

export default PersonalityApp;