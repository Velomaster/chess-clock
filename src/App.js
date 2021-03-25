import React, { Component } from 'react';
import Header from './components/Header/Header';
import Players from '../src/containers/Players/Players';
import Settings from '../src/containers/Settings/Settings';
import MainPage from '../src/components/MainPage/MainPage';
import Collapse from '@material-ui/core/Collapse';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import TimeOver from './components/TimeOver/TimeOver';
import './App.css';

class  App extends Component {
  state = {
    playerOne: {
      name: 'Player Name',
      color: 'white',
    },
    playerTwo: {
      name: 'Player Name',
      color: 'black',
    },
    initialTimer: 5,
    showSettings: false,
    gameStarted: false,
    timeout: false,
    lostPlyaer: ""
  }

  settingsOnClickHandler = () => {
    const toggle = this.state.showSettings;
    this.setState({showSettings: !toggle})
  }

  buttonStartHandler = () => {
    this.setState({gameStarted: true, timeout: false});
  }

  buttonEndHandler = () => {
      this.setState({gameStarted: false});
    }

  playerButtonHandler = () => {
    //change active button state
    const togglePlayerOne = this.state.playerOne.active;
    const togglePlayerTwo = this.state.playerTwo.active;
    const newState = {
      ...this.state, 
      playerOne: {...this.state.playerOne, active: !togglePlayerOne},
      playerTwo: {...this.state.playerTwo, active: !togglePlayerTwo},
    }
    this.setState(newState);
  }

  applyChanges = (incomingData) => {
    const newState = {
      showSettings: false,
      initialTimer: incomingData.initialTimer, 
      ...incomingData
    }
    this.setState(newState)
  }

  timeOver = (lostPlayer) => {
    const gameResults = {
      winner: lostPlayer === "playerOne" ? this.state.playerTwo.name : this.state.playerOne.name,
      looser: lostPlayer === "playerTwo" ? this.state.playerTwo.name : this.state.playerOne.name,
    }
    
    this.setState({timeout: true, gameStarted: false, gameResults });
  } 

  render() {
    return (
    <React.Fragment>
      <Header 
        clicked={this.settingsOnClickHandler}
        buttonStartClicked={this.buttonStartHandler} 
        gameStarted={this.state.gameStarted}
        buttonEndClicked={this.buttonEndHandler}
        />
      <Collapse in={this.state.showSettings}> 
        {this.state.showSettings ? 
          <Paper elevation={8}>
            <Settings 
              submitChanges={this.applyChanges} 
              playerOne={this.state.playerOne} 
              playerTwo={this.state.playerTwo} 
              initialTimer={this.state.initialTimer} /> </Paper>: 
              null}
          
      </Collapse>
      <Grow in={this.state.timeout}>
          <Paper elevation={4} variant="outlined" square>
            {/* <TimeOver 
              gameResults={this.state.gameResults} 
              startGame={this.buttonStartHandler}
              openSettings={this.settingsOnClickHandler} /> */}
            {this.state.timeout ? 
            <TimeOver 
              gameResults={this.state.gameResults}
              startGame={this.buttonStartHandler}
              openSettings={this.settingsOnClickHandler} /> : 
              null}
          </Paper>
      </Grow>
      {
      !this.state.gameStarted ? 
        <MainPage /> : 
        <Players 
          playerOne={this.state.playerOne} 
          playerTwo={this.state.playerTwo}
          initialTimer={this.state.initialTimer}
          gameStarted={this.state.gameStarted}
          timeOver={this.timeOver}
          />
      }
    </React.Fragment>
  )};
};

export default App;
