import React, { Component } from 'react';
import Header from './components/Header/Header';
import Players from '../src/containers/Players/Players';
import Settings from '../src/containers/Settings/Settings';
import MainPage from '../src/components/MainPage/MainPage';
import Collapse from 'react-bootstrap/Collapse';
import TimeOver from './components/TimeOver/TimeOver';
import Modal from './components/Modal/Modal';
import './App.css';

class  App extends Component {
  state = {
    playerOne: {
      name: 'Player One',
      color: 'white',
    },
    playerTwo: {
      name: 'Player Two',
      color: 'black',
    },
    initialTimer: 30,
    showSettings: false,
    gameStarted: false,
    timeout: false,
    lostPlyaer: "",
    showGameResults: false,
  }

  settingsOnClickHandler = () => {
    const toggle = this.state.showSettings;
    this.setState({showSettings: !toggle, timeout: false})
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

  hideGameResults = () => {
    this.setState({showGameResults: false, timeout: false})
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
        <div>
          <Settings 
            submitChanges={this.applyChanges} 
            playerOne={this.state.playerOne} 
            playerTwo={this.state.playerTwo} 
            initialTimer={this.state.initialTimer}/> 
        </div>
      </Collapse>
      <Modal 
        timeout={this.state.timeout} 
        hideGameResults={this.hideGameResults}>
          <TimeOver 
                gameResults={this.state.gameResults}
                startGame={this.buttonStartHandler}
                openSettings={this.settingsOnClickHandler} />
      </Modal>
      {!this.state.gameStarted ? 
        <MainPage
          initialTimer={this.state.initialTimer} /> : 
        <Players 
          playerOne={this.state.playerOne} 
          playerTwo={this.state.playerTwo}
          initialTimer={this.state.initialTimer}
          gameStarted={this.state.gameStarted}
          timeOver={this.timeOver}
          />}
    </React.Fragment>
  )};
};

export default App;
