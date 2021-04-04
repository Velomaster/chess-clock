import React from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './MainPage.css';

const MainPage = () => {
    return (
        <Container >
                <Row >
                    <Col className="text-center">
                        <h1>SIMPLE CHESS CLOCK</h1>  
                    </Col>
                </Row>
                <Row className="row">
                    <Col className="d-flex justify-content-center">
                        <Table className="table">
                            <tbody>
                                <tr>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                </tr>
                                <tr>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>

                                </tr>
                                <tr>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                </tr>
                                <tr>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                </tr>
                                <tr>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                </tr>
                                <tr>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                </tr>
                                <tr>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                </tr>
                                <tr>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                    <td className="black"></td>
                                    <td className="white"></td>
                                </tr>   
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
    )
}

export default MainPage;