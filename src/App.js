import React, { Component } from 'react';
import Header from './components/Header/Header';
import Players from '../src/containers/Players/Players';
import Settings from '../src/containers/Settings/Settings';
import MainPage from '../src/components/MainPage/MainPage';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
    gameStarted: false
  }

  settingsOnClickHandler = () => {
    const toggle = this.state.showSettings;
    this.setState({showSettings: !toggle})
  }

  buttonStartHandler = () => {
    this.setState({gameStarted: true});
    console.log(this.state)
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
          <Settings 
            submitChanges={this.applyChanges} 
            playerOne={this.state.playerOne} 
            playerTwo={this.state.playerTwo} 
            initialTimer={this.state.initialTimer} /> : 
          null}
      </Collapse>
      {/* <FormControlLabel
        control={this.props.timeout}
        label="Show"
      /> */}
      {
      !this.state.gameStarted ? 
        <MainPage /> : 
        <Players 
          playerOne={this.state.playerOne} 
          playerTwo={this.state.playerTwo}
          initialTimer={this.state.initialTimer}
          gameStarted={this.state.gameStarted}
          timeout={this.timeout}
          />
      }
    </React.Fragment>
  )};
};

export default App;
