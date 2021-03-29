import React, { Component } from 'react';
import './Settings.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            playerOne: props.playerOne,
            playerTwo: props.playerTwo,
            initialTimer: props.initialTimer,
        }
    }

    colorChangeHandler = (event) => {
        // Getting color and name from data attributes
        const colorName = event.target.getAttribute("data-color");
        const playerName = event.target.getAttribute("data-name");

        const otherPlayer = playerName === "playerOne" ? "playerTwo" : "playerOne";
        const otherColor = colorName === "black" ? "white" : "black";
        const newState = {
            [otherPlayer]: {...this.state[otherPlayer], color: otherColor},
            [playerName]: {...this.state[playerName], color: colorName}
        }
        
        this.setState(newState);
    }

    playerNameHandler = (event) => {
        const {name: playerNumber, value: playerName} = event.target;
        const newState = {...this.state, [playerNumber]: {...this.state[playerNumber], name: playerName}}
        this.setState(newState)
    }

    timerHandler = (event) => {
        const time = event.target.value;
        const newState = { 
            ...this.state,
            initialTimer: time
        }
        this.setState(newState)
    }

    closeSettings = () => {
        this.setState({showSettings: false})
    }

    validateForm =() => {

    }

    render() {

        return (
            <div className="Settings">
                <Container fluid="sm">
                    <Form onSubmit={e => e.preventDefault()} noValidate>
                        <Form.Group as={Row} isIndavlid className="justify-content-center">
                            <Form.Label column xs={2} id="formLabel">Player One:</Form.Label>
                            <Col sm="6">
                                <Form.Control 
                                    id="formInput" 
                                    onChange={this.playerNameHandler}
                                    value={this.state.playerOne.name} 
                                    name="playerOne"
                                    placeholder="Player One Name" 
                                    required
                                    plaintext />
                                <Form.Control.Feedback type="invalid">Please choose player's name</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} hasValidation className="justify-content-center">
                            <Form.Label column xs={2} id="formLabel">Color:</Form.Label>
                            <Col sm="6" >
                                <Form.Check 
                                    onChange={this.colorChangeHandler}
                                    style={{color: "wheat"}} 
                                    checked={this.state.playerOne.color === "white" ? true : false} 
                                    inline 
                                    label="White" 
                                    id="playerOne-white"
                                    data-name="playerOne"
                                    data-color="white"
                                    type="radio"
                                />
                                <Form.Check 
                                    onChange={this.colorChangeHandler}
                                    style={{color: "wheat"}} 
                                    checked={this.state.playerOne.color === "black" ? true : false}
                                    inline 
                                    label="Black"
                                    id="playerOne-black"
                                    data-name="playerOne"
                                    data-color="black"
                                    type="radio"
                                />
                            </Col>
                            </Form.Group>
                        <Form.Group as={Row} className="justify-content-center">
                            <Form.Label column xs={2} id="formLabel">Player Two:</Form.Label>
                            <Col sm="6">
                                <Form.Control 
                                    onChange={this.playerNameHandler}
                                    id="formInput" 
                                    value={this.state.playerTwo.name}
                                    name="playerTwo" 
                                    type="text" 
                                    placeholder="Player Two Name" 
                                    required
                                    plaintext/>
                                <Form.Control.Feedback type="invalid">Please choose player's name</Form.Control.Feedback>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="justify-content-center">
                            <Form.Label column xs={2} id="formLabel">Color:</Form.Label>
                            <Col sm="6">
                                <Form.Check 
                                    onChange={this.colorChangeHandler}
                                    style={{color: "wheat"}} 
                                    checked={this.state.playerTwo.color === "white" ? true : false} 
                                    inline 
                                    label="White"
                                    id="playerTwo-white"
                                    data-name="playerTwo"
                                    data-color="white"
                                    type="radio"
                                />
                                <Form.Check 
                                    onChange={this.colorChangeHandler}
                                    style={{color: "wheat"}} 
                                    checked={this.state.playerTwo.color === "black" ? true : false}
                                    inline 
                                    label="Black"
                                    id="playerTwo-black"
                                    data-name="playerTwo"
                                    data-color="black"
                                    type="radio"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}  className="justify-content-center">
                            <Form.Label column xs={2} id="formLabel">Set Timer:</Form.Label>
                            <Col sm="6">
                                <Form.Control 
                                    onChange={this.timerHandler}
                                    id="formInput" 
                                    type="number" 
                                    placeholder="30"
                                    value={this.state.initialTimer} 
                                    required
                                    plaintext/>
                                <Form.Control.Feedback type="invalid">Please choose player's name</Form.Control.Feedback>
                                <Form.Text className="text-muted">Put minuts here</Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="SettingsButton">
                            <Col>
                                <Button 
                                    onClick={() => this.props.submitChanges(this.state)}
                                    type="button" 
                                    variant="outline-light">
                                    Save</Button></Col>
                        </Form.Group>
                    </Form>
                </Container>
            </div>    
        )
    }
};

export default Settings;