import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./TimeOver.css"


const TimeOver = (props) => {
    return (
            <Card className="card" >
                <Card.Img className="image" variant="top" src="https://img.wallpapersafari.com/desktop/1280/1024/39/12/1WKqbR.jpg" />
                <Card.Body>
                    <Card.Title>Player One won!</Card.Title>
                    <Card.Text>
                    Player Two ran out of time. Player One won this game. Rematch?
                    </Card.Text>
                    <Button onClick={props.startGame} variant="outline-dark">Start New Game</Button>
                    <Button onClick={props.openSettings} variant="link">Settings</Button>            
                </Card.Body>
            </Card>   
    )
}

export default TimeOver;