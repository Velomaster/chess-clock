import React, { Component } from 'react';
import { FaChess } from 'react-icons/fa'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Players.css';

class Players extends Component {
    activePlayer; // 'playerOne' | 'playerTwo'

    // timer ids
    timerIdPlayerOne;
    timerIdPlayerTwo;

    constructor(props) {
        super(props);

        this.state = {
            activePlayer: '',
            playerOneRemainingTime: {},
            playerTwoRemainingTime: {},
            playerOneTime: props.initialTimer * 60,
            playerTwoTime: props.initialTimer * 60,
            playerOneColor: props.playerOne.color,
        };

        this.handleKey = this.handleKey.bind(this);
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        seconds = seconds < 10 ? '0' + seconds : seconds;

        let obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };
        return obj;
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.props.initialTimer * 60);
        this.setState({ playerOneRemainingTime: timeLeftVar });
        this.setState({ playerTwoRemainingTime: timeLeftVar });
        this.startGame();
        this.countDown();
        window.addEventListener("keydown", this.handleKey);
    }

    componentWillUnmount() {
        clearInterval(this.timerIdPlayerOne);
        clearInterval(this.timerIdPlayerTwo);
        window.removeEventListener("keydown", this.handleKey);
    }

    startGame() {
        this.activePlayer = this.state.playerOneColor === "white" ? 'playerOne' : 'playerTwo'; // playerOne | playerTwo
        this.startTimer();
    }

    startTimer() {
        this.setState({activePlayer: this.activePlayer}); // Needed only for disabling buttons a little faster
        if (this.activePlayer === 'playerOne' && this.state.playerOneTime > 0) {
            this.timerIdPlayerOne = setInterval(this.countDown.bind(this), 1000);
        } else if (this.activePlayer === 'playerTwo' && this.state.playerTwoTime > 0) {
            this.timerIdPlayerTwo = setInterval(this.countDown.bind(this), 1000);
        }
    }

    countDown() {
        if (this.activePlayer === 'playerOne') {

            let seconds = this.state.playerOneTime - 1;
            this.setState({
                playerOneRemainingTime: this.secondsToTime(seconds),
                playerOneTime: seconds,
            });

            if (seconds === 0) { 
                clearInterval(this.timerIdPlayerOne);
            }
            //time is over fired
            if (this.state.playerOneTime === 0) {
                this.props.timeOver(this.state.activePlayer)
            }

        } else if (this.activePlayer === 'playerTwo') {

             let seconds = this.state.playerTwoTime - 1;
             this.setState({
                playerTwoRemainingTime: this.secondsToTime(seconds),
                playerTwoTime: seconds,
             });
             if (seconds === 0) { 
                 clearInterval(this.timerIdPlayerTwo);
             }
            //time is over fired
             if (this.state.playerTwoTime === 0) {
                this.props.timeOver(this.state.activePlayer)
            }
        }
    }

    pauseTimer(timerId) {
        clearInterval(timerId);
    }

    buttonOneClicked() {
        this.activePlayer = 'playerTwo';
        this.pauseTimer(this.timerIdPlayerOne);
        this.startTimer();
    }

    buttonTwoClicked() {
        this.activePlayer = 'playerOne';
        this.pauseTimer(this.timerIdPlayerTwo);
        this.startTimer();
    }

    handleKey() {
        if (this.activePlayer === 'playerOne') {
            this.buttonOneClicked();
        } else {
            this.buttonTwoClicked();
        }
    }

    render() {
        const iconBlack = {
            color: "black",
            border: "1px solid grey",
            borderRadius: "5px",
            background: "lightGrey",
            height: "75px",
            width: "75px",
            padding: "10px"
        }
    
        const iconWhite = {
            color: "white",
            border: "1px solid grey",
            borderRadius: "5px",
            background: "lightGrey",
            height: "75px",
            width: "75px",
            padding: "10px"
        }

        return (
                <Container >
                    <Row className="PlayersName text-center">
                        <Col xs="6" sm="6">{this.props.playerOne.name}</Col>
                        <Col xs="6" sm="6">{this.props.playerTwo.name}</Col>
                    </Row>
                    <Row className="PlayersColor">
                        <Col><FaChess style={this.props.playerOne.color === "white" ? iconWhite : iconBlack} /></Col>
                        <Col><FaChess style={this.props.playerTwo.color === "white" ? iconWhite : iconBlack}/></Col>
                    </Row>
                    <Row className="Timer text-center">
                        <Col>{this.state.playerOneRemainingTime.h ? 
                        this.state.playerOneRemainingTime.h + ":" + this.state.playerOneRemainingTime.m + ":" + this.state.playerOneRemainingTime.s : 
                        this.state.playerOneRemainingTime.m + ":" + this.state.playerOneRemainingTime.s}</Col>

                        <Col>{this.state.playerTwoRemainingTime.h ? 
                        this.state.playerTwoRemainingTime.h + ":" + this.state.playerTwoRemainingTime.m + ":" + this.state.playerTwoRemainingTime.s : 
                        this.state.playerTwoRemainingTime.m + ":" + this.state.playerTwoRemainingTime.s}</Col>
                    </Row> 
                    <Row className="PlayersButton">
                        <Col>
                            <Button
                                onClick={this.buttonOneClicked.bind(this)}
                                variant="info"
                                disabled={this.state.activePlayer === 'playerTwo'}
                                >SET</Button>
                        </Col>
                        <Col>
                            <Button 
                                onClick={this.buttonTwoClicked.bind(this)}
                                variant="info"
                                disabled={this.state.activePlayer === 'playerOne'}
                                >SET</Button>
                        </Col>
                    </Row>

                </Container>
        )
    }
}

export default Players;