import React from 'react'
import { GiChessKing } from 'react-icons/gi';
import Aux from '../../hoc/Aux/Aux';
import './Header.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const header = (props) => {
    return (
        <Aux>
            <Navbar expand="lg" variant="dark" bg="dark">
                <Navbar.Brand href="#" style={{color: "lemonchiffon", paddingBottom: "0px"}}><GiChessKing className="logo" />Chess Clock</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="justify-content-end" id="settings-button">
                        <Nav.Link onClick={props.clicked} href="#home" disabled={props.gameStarted ? true : false} >Settings</Nav.Link>
                    </Nav>
                {!props.gameStarted ? 
                    <Button onClick={props.buttonStartClicked} variant="outline-light">Start Game</Button> :
                    <Button onClick={props.buttonEndClicked} variant="outline-danger">End Game</Button>
                }
                </Navbar.Collapse>
            </Navbar> 
        </Aux>
    )
};

export default header;