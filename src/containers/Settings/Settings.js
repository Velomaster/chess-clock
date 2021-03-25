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
        const {name: playerName, value: colorName} = event.target;
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

    render() {

        return (
            <div className="Settings">
                <Container fluid="sm">
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Group as={Row} className="justify-content-center">
                            <Form.Label column xs={2} id="formLabel">Player One:</Form.Label>
                            <Col sm="6">
                                <Form.Control 
                                    id="formInput" 
                                    onChange={this.playerNameHandler}
                                    value={this.state.playerOne.name} 
                                    name="playerOne"
                                    placeholder="Player One Name" 
                                    plaintext /></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="justify-content-center">
                            <Form.Label column xs={2} id="formLabel">Color:</Form.Label>
                                <Col sm="6">{['radio'].map((type) => (
                                    <div  key={`inline-${type}`} className="align-items-center">
                                        <Form.Check 
                                            onChange={this.colorChangeHandler}
                                            style={{color: "wheat"}} 
                                            checked={this.state.playerOne.color === "white" ? "checked" : null} 
                                            inline 
                                            label="White" 
                                            value="white"
                                            name="playerOne" 
                                            type={type} 
                                            id={`inline-${type}-1`} />
                                        <Form.Check 
                                            onChange={this.colorChangeHandler}
                                            style={{color: "wheat"}} 
                                            checked={this.state.playerOne.color === "black" ? "checked" : null} 
                                            inline 
                                            label="Black" 
                                            value="black"
                                            name="playerOne"  
                                            type={type} 
                                            id={`inline-${type}-2`} />
                                    </div>
                                    ))}
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
                                    plaintext/></Col>
                        </Form.Group>
                        <Form.Group as={Row} className="justify-content-center">
                            <Form.Label column xs={2} id="formLabel">Color:</Form.Label>
                                <Col sm="6">{['radio'].map((type) => (
                                    <div key={`inline-${type}`} >
                                        <Form.Check 
                                            onChange={this.colorChangeHandler} 
                                            style={{color: "wheat"}} 
                                            checked={this.state.playerTwo.color === "white" ? "checked" : null} 
                                            inline 
                                            label="White" 
                                            value="white"
                                            name="playerTwo" 
                                            type={type} 
                                            id={`inline-${type}-1`} />
                                        <Form.Check 
                                            onChange={this.colorChangeHandler} 
                                            style={{color: "wheat"}} 
                                            checked={this.state.playerTwo.color === "black" ? "checked" : null} 
                                            inline 
                                            label="Black" 
                                            value="black"
                                            name="playerTwo"  
                                            type={type} 
                                            id={`inline-${type}-2`} />
                                    </div>
                                    ))}
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
                                    plaintext/>
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