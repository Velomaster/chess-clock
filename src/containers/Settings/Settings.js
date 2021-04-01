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
            form: {
                playerOne: {
                    value: props.playerOne.name,
                    valid: true,
                    errorMessage: '',
                    color: "white"
                },
                playerTwo: {
                    value: props.playerTwo.name,
                    valid: true,
                    errorMessage: '',
                    color: "black"
                },
                timer: {
                    time: 30,
                    valid: true,
                    errorMessage: ''
                },
            }
        }
    }

    colorChangeHandler = (event) => {
        // Getting color and name from data attributes
        const colorName = event.target.getAttribute("data-color");
        const playerName = event.target.getAttribute("data-name");

        const otherPlayer = playerName === "playerOne" ? "playerTwo" : "playerOne";
        const otherColor = colorName === "black" ? "white" : "black";
        const newState = {
            form: {
                ...this.state.form,
                [otherPlayer]:{...this.state.form[otherPlayer], color: otherColor}, 
                [playerName]: {...this.state.form[playerName], color: colorName}
            }
        }
        this.setState(newState);
    }

    playerNameHandler = (event) => {
        const {name: playerNumber, value: playerName} = event.target;
        const newState = {form: {...this.state.form, [playerNumber]: {...this.state.form[playerNumber], value: playerName}}}
        this.setState(newState)
    }

    timerHandler = (event) => {
        const time = event.target.value;
        const newState = { 
            form: {...this.state.form, timer: {...this.state.form.timer, time: time}}
        }
        this.setState(newState)
    }

    checkValidity(e) {
        if (!this.state.form.playerOne.valid || !this.state.form.playerTwo.valid || !this.state.form.timer.valid) {
            return;
        }
    }

    submit(e) {
        e.preventDefault();
        let playerOneIsValid = true;
        let playerTwoIsValid = true;
        let timerIsValid = true;
        let updatedForm = this.state.form;

        // player one name validation
        if (this.state.form.playerOne.value === "") {
            playerOneIsValid = false;
            updatedForm = {...updatedForm, playerOne: {...updatedForm.playerOne, valid: false, errorMessage: "Enter player's name"}};
            this.setState({form: updatedForm});
        } else if (this.state.form.playerOne.value.length < 3) {
            playerOneIsValid = false;
            updatedForm = {...updatedForm, playerOne: {...updatedForm.playerOne, valid: false, errorMessage: "Enter minimum 3 digits"}};
            this.setState({form: updatedForm});
        } else {
            updatedForm = {...updatedForm, playerOne: {...updatedForm.playerOne, valid: true}}
            this.setState({form: updatedForm});
        } 
       
        //player two name validation
        if (this.state.form.playerTwo.value === "") {
            playerTwoIsValid = false;
            updatedForm = {...updatedForm, playerTwo: {...updatedForm.playerTwo, valid: false, errorMessage: "Enter player's name"}};
            this.setState({form: updatedForm});
        } else if (this.state.form.playerTwo.value.length < 3) {
            playerTwoIsValid = false;
            updatedForm = {...updatedForm, playerTwo: {...updatedForm.playerTwo, valid: false, errorMessage: "Enter minimum 3 digits"}};
            this.setState({form: updatedForm});
        } else {
            updatedForm = {...updatedForm, playerTwo: {...updatedForm.playerTwo, valid: true}}
            this.setState({form: updatedForm});
        } 

        //timer validation
        if (this.state.form.timer.time === "") {
            timerIsValid = false;
            updatedForm = {...updatedForm, timer: {...updatedForm.timer, valid: false, errorMessage: "Enter minutes"}}
            this.setState({form: updatedForm});
        } else if (this.state.form.timer.time < 1) {
            timerIsValid = false;
            updatedForm = {...updatedForm, timer: {...updatedForm.timer, valid: false, errorMessage: "Enter minimum 1 minute"}};
            this.setState({form: updatedForm});
        } else {
            updatedForm = {...updatedForm, timer: {...updatedForm.timer, valid: true}};
            this.setState({form: updatedForm});
        }

        //validity check
        if (playerOneIsValid === false || playerTwoIsValid === false || timerIsValid === false) {
            return;
        }
        //create object with new data and transfer to original state
        const newData = {
            playerOne: {
                name: this.state.form.playerOne.value,
                color: this.state.form.playerOne.color
            },
            playerTwo: {
                name: this.state.form.playerTwo.value,
                color: this.state.form.playerTwo.color
            },
            initialTimer: this.state.form.timer.time
        }
        this.props.submitChanges(newData);
    }

    render() {

        return (
            <div className="Settings">
                <Container>
                    <Row>
                        <Col md={{span: 8, offset: 2}} sm="12">

                            <Form onSubmit={this.submit.bind(this)} noValidate>
                                <Form.Group as={Row} className="align-items-center">
                                    <Form.Label column sm="12" md="4" lg="3" id="formLabel">Player One:</Form.Label>
                                    <Col sm="12" md="8" lg="9">
                                        <Form.Control 
                                            id="formInput" 
                                            onChange={this.playerNameHandler}
                                            value={this.state.form.playerOne.value} 
                                            name="playerOne"
                                            placeholder="Player One Name" 
                                            required
                                            isInvalid={!this.state.form.playerOne.valid}
                                            plaintext />
                                        <Form.Control.Feedback type="invalid">{this.state.form.playerOne.errorMessage}</Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column xs="4" md="3" id="formLabel">Color:</Form.Label>
                                    <Col xs="8" md="9" className="align-self-center">
                                        <Form.Check 
                                            onChange={this.colorChangeHandler}
                                            style={{color: "wheat"}} 
                                            checked={this.state.form.playerOne.color === "white" ? true : false} 
                                            inline 
                                            label="White" 
                                            id="playerOne-white"
                                            data-name="playerOne"
                                            data-color="white"
                                            type="radio"/>
                                        <Form.Check 
                                            onChange={this.colorChangeHandler}
                                            style={{color: "wheat"}} 
                                            checked={this.state.form.playerOne.color === "black" ? true : false}
                                            inline 
                                            label="Black"
                                            id="playerOne-black"
                                            data-name="playerOne"
                                            data-color="black"
                                            type="radio"/>

                                    </Col>
                                </Form.Group>
                                <Form.Group className="justify-content-center">
                                    <Form.Label id="formLabel">Player Two:</Form.Label>
                                    <Form.Control 
                                        onChange={this.playerNameHandler}
                                        id="formInput" 
                                        value={this.state.form.playerTwo.value}
                                        name="playerTwo" 
                                        type="text" 
                                        placeholder="Player Two Name" 
                                        isInvalid={!this.state.form.playerTwo.valid}
                                        required
                                        plaintext/>
                                    <Form.Control.Feedback type="invalid">{this.state.form.playerTwo.errorMessage}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="justify-content-center">
                                    <Form.Label id="formLabel">Color:</Form.Label>
                                    <Form.Check 
                                        onChange={this.colorChangeHandler}
                                        style={{color: "wheat"}} 
                                        checked={this.state.form.playerTwo.color === "white" ? true : false} 
                                        inline 
                                        label="White"
                                        id="playerTwo-white"
                                        data-name="playerTwo"
                                        data-color="white"
                                        type="radio" />
                                    <Form.Check 
                                        onChange={this.colorChangeHandler}
                                        style={{color: "wheat"}} 
                                        checked={this.state.form.playerTwo.color === "black" ? true : false}
                                        inline 
                                        label="Black"
                                        id="playerTwo-black"
                                        data-name="playerTwo"
                                        data-color="black"
                                        type="radio"/>
                                </Form.Group>
                                <Form.Group className="justify-content-center">
                                <Form.Label id="formLabel">Set Timer:</Form.Label>
                                    <Form.Control 
                                        onChange={this.timerHandler}
                                        id="formInput" 
                                        type="number" 
                                        placeholder="30"
                                        value={this.state.form.timer.time} 
                                        required
                                        isInvalid={!this.state.form.timer.valid}
                                        plaintext/>
                                    <Form.Control.Feedback type="invalid">{this.state.form.timer.errorMessage}</Form.Control.Feedback>
                                    <Form.Text className="text-muted">Put minuts here</Form.Text>
                                </Form.Group>
                                <Form.Group className="SettingsButton">
                                    <Button type="submit" variant="outline-light">Save</Button>
                                </Form.Group>
                            </Form>

                        </Col>
                    </Row>
                </Container>
            </div>    
        )
    }
};

export default Settings;