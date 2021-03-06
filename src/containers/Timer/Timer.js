import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Timer extends Component {

    //timer IDs
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

    render() {
        return (
            <div>
                <Row>
                    <Col>{this.state.playerOneRemainingTime.m}:{this.state.playerOneRemainingTime.s}</Col>  
                </Row>
                <Row>
                    <Col> 
                        <Button 
                            onClick={this.props.buttonClicked}
                            style={{width: "200px"}} 
                            variant="info"
                            // disabled={this.state.activePlayer === 'playerOne'}
                            >SET</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Timer;