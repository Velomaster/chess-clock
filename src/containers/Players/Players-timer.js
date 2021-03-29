import React, { Component } from 'react';
import { FaChess } from 'react-icons/fa'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Timer from '../Timer/Timer';
import './Players.css';

class Players extends Component {
    timerIdPlayerOne;
    timerIdPlayerTwo;

    constructor(props) {
        super(props);
        this.state = { 
            playerOneRemainingTime: {},
            playerTwoRemainingTime: {},

        };
        
        this.state.playersInitialTime = props.initialTimer * 60;
        
        //timer settings
        this.timerPlayerOne = 0;
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
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
            s: seconds
        };
        return obj;
    }

    componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.playersInitialTime);
    this.setState({ playerOneRemainingTime: timeLeftVar });
    }

    startTimer() {
        if (this.timerPlayerOne === 0 && this.state.playersInitialTime > 0) {
        this.timerPlayerOne = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.playersInitialTime - 1;
        this.setState({
            playerOneRemainingTime: this.secondsToTime(seconds),
            playersInitialTime: seconds,
        });
        // Check if we're at zero.
        if (seconds === 0) { 
        clearInterval(this.timerPlayerOne);
        }
    }

    pauseTimer (timerIdPlayerOne) {
        clearInterval(timerIdPlayerOne)
    }

    buttonClicked() {
        this.startTimer()
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
            <div>
                <Container fluid="sm" >
                    <Row className="PlayersName">
                        <Col>{this.props.playerOne.name}</Col>
                        <Col>{this.props.playerTwo.name}</Col>
                    </Row>
                    <Row className="PlayersColor">
                        <Col ><FaChess style={this.props.playerOne.color === "white" ? iconWhite : iconBlack} /></Col>
                        <Col><FaChess style={this.props.playerTwo.color === "white" ? iconWhite : iconBlack}/></Col>
                    </Row>
                    <Row className="Timer">
                        <Col>
                            <Timer
                                initialTimer={this.props.initialTimer} 
                                startTimer={this.buttonOneClicked}
                                activePlayer={this.props.playerTwo}
                                buttonClicked={this.buttonClicked}
                                />
                        </Col>
                        <Col>
                            <Timer />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Players;