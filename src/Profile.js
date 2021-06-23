import React, { Component } from 'react'
import { withAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import BestBooks from './componsnts/BestBooks';

import Container from 'react-bootstrap/Container';

export class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.auth0.user.name,
            userEmail: this.props.auth0.user.email,
            userPicture: this.props.auth0.user.picture
        }
    }

    render() {
        return (
            <Container>
                <Row  className="g-4" style={{ margin: '2% 30%' ,width: '400px' }}>
                    {Array.from({ length: 1 }).map((_, idx) => (
                        <Col>
                            <Card>
                                <Card.Img variant="top" src={this.state.userPicture} alt={this.state.userName} />
                                <Card.Body>
                                    <Card.Title>{this.state.userName}</Card.Title>
                                    <Card.Title>{this.state.userEmail}</Card.Title>
                                </Card.Body>
                            </Card>

                        </Col>
                    ))}
                </Row>
                <BestBooks />
            </Container>
        )
    }
}

export default withAuth0(Profile);
