import React, { Component } from 'react'
import { withAuth0 } from "@auth0/auth0-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

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
            <Row xs={1} md={6} className="g-4">
                {Array.from({ length: 1 }).map((_, idx) => (
                    <Col>
                        <Card>
                            <Card.Img variant="top" src={this.state.userPicture} alt={this.state.userName} />
                            <Card.Body>
                                <Card.Title>{this.state.userName}</Card.Title>
                                <Card.Text>
                                {this.state.userEmail}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        )
    }
}

export default withAuth0(Profile);
