import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import image from '../../assets/images/game-over.jpg'
import "./TimeOver.css"

const TimeOver = (props) => {
    return (
        <Container>
            <Row>
                <Col className="d-flex justify-content-center" style={{padding: "0"}}>
                    <Card className="card" >
                        <Card.Img className="image" variant="top" src={image}/>
                        <Card.Body >
                            <Card.Title className="title"><b>{props.gameResults.winner} won!</b></Card.Title>
                            <Card.Text>
                            {props.gameResults.looser} ran out of time. {props.gameResults.winner} won this game. Rematch?
                            </Card.Text>
                            <Button size="sm" onClick={props.startGame} variant="outline-dark">Start New Game</Button>
                            <Button className="settings" size="sm" onClick={props.openSettings} variant="link">Settings</Button>            
                        </Card.Body>
                    </Card>   
                </Col>
            </Row>
        </Container>
    )
}

export default TimeOver;