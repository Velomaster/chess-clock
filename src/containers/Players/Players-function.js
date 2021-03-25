import React, { createRef, useState, useEffect } from 'react';
import { FaChess } from 'react-icons/fa'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Countdown, { zeroPad } from 'react-countdown';
import './Players.css';

const Players = (props) => {

    const [buttonOne, setButtonOne] = useState(true);
    const [buttonTwo, setButtonTwo] = useState(false);

    const [remainingTimePlayerOne, setRemainingTimePlayerOne] = useState()

    const iconBlack = {
        color: "black",
        background: "lightGrey",
        height: "45px",
        width: "45px",
        padding: "5px"
    }

    const iconWhite = {
        color: "white",
        background: "lightGrey",
        height: "45px",
        width: "45px",
        padding: "5px"
    }

    const countdownPlayerOneRef = createRef();
    const countdownPlayerTwoRef = createRef();


    useEffect(() => {
       
        if (buttonOne && props.gameStarted) {
            const initialTime = Date.now() + (props.playerOne.timeRemains * 60000)
            setRemainingTimePlayerOne(initialTime)
            countdownPlayerOneRef.current.getApi().start();
        } else {
            if (countdownPlayerTwoRef.current) {
                countdownPlayerTwoRef.current.getApi().start();
            }
        }
        console.log("start timer")
    }, [props.gameStarted])

    useEffect(() => {
        const buttonOneIsActive = props.playerOne.color === "white" ? true : false;
        const buttonTwoIsActive = props.playerTwo.color === "white" ? true : false;
        setButtonOne(buttonOneIsActive);
        setButtonTwo(buttonTwoIsActive);

        setRemainingTimePlayerOne(props.playerOne.timeRemains)
    }, [props.playerOne, props.playerTwo]);



    const reverseButtons = () => {
        setButtonOne(bOne => !bOne);
        setButtonTwo(bTwo => !bTwo);
    };

    const renderer = ({minutes, seconds, completed}) => {
        if (completed) {
            return <span>LOST!</span>
        } else {
            return <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
        }
    }

   
    const buttonOneClicked = () => {
        //timer for player two paused
        countdownPlayerTwoRef.current.getApi().start();
        //timer for player one started
        countdownPlayerOneRef.current.getApi().pause();
        console.log(countdownPlayerOneRef.current)
        // setRemainingTimePlayerOne(seconds)
        //disable button One
        reverseButtons();
    }

    const buttonTwoClicked = () => {
        //timer for player two paused
        countdownPlayerOneRef.current.getApi().start();
        //timer for player one started
        const {seconds} = countdownPlayerTwoRef.current.getApi().pause();
        // setRemainingTimePlayerTwo(seconds)
        //disable button One
        reverseButtons();
    }

    const game = <div>
             <Row className="Timer">
                    <Col><Countdown 
                        date={remainingTimePlayerOne}
                        renderer={renderer}
                        autoStart={false}
                        ref={countdownPlayerOneRef}

                        /></Col>
                    <Col><Countdown 
                        date={Date.now() + (props.playerOne.timeRemains * 60000)}
                        renderer={renderer}
                        autoStart={false}
                        ref={countdownPlayerTwoRef}

                        /></Col>
                </Row>
                <Row className="PlayersButton">
                    <Col><Button 
                        disabled={!buttonOne}
                        onClick={buttonOneClicked} 
                        style={{width: "200px"}} 
                        variant="info">Set</Button>{' '}</Col>
                    <Col><Button 
                        disabled={!buttonTwo} 
                        onClick={buttonTwoClicked}
                        style={{width: "200px"}} 
                        variant="info">Set</Button>{' '}</Col>
                </Row>
    </div>

    return (

        
        <div>
            <Container fluid="sm" >
                <Row className="PlayersName">
                    <Col>{props.playerOne.name}</Col>
                    <Col>{props.playerTwo.name}</Col>
                </Row>
                <Row className="PlayersColor">
                    <Col ><FaChess style={props.playerOne.color === "white" ? iconWhite : iconBlack} /></Col>
                    <Col><FaChess style={props.playerTwo.color === "white" ? iconWhite : iconBlack}/></Col>
                </Row>
               {props.gameStarted ? game : null}
            </Container>
        </div>
    )
}

export default Players;