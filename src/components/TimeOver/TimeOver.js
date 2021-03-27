import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./TimeOver.css"


const TimeOver = (props) => {
    return (
            <Card className="card" >
                <Card.Img className="image" variant="top" src="https://img.wallpapersafari.com/desktop/1280/1024/39/12/1WKqbR.jpg" />
                <Card.Body >
                    <Card.Title className="title"><b>{props.gameResults.winner} won!</b></Card.Title>
                    <Card.Text>
                    {props.gameResults.looser} ran out of time. {props.gameResults.winner} won this game. Rematch?
                    </Card.Text>
                    <Button size="sm" onClick={props.startGame} variant="outline-dark">Start New Game</Button>
                    <Button className="settings" size="sm" onClick={props.openSettings} variant="link">Settings</Button>            
                </Card.Body>
            </Card>   
    )
}

export default TimeOver;