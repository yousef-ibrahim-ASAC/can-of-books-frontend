import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel';
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: this.props.auth0.user.email,
            serverUrl: process.env.REACT_APP_SERVER_URL,
            booksData: []
        }
    }

    componentDidMount = () => {
        console.log(this.state.serverUrl);
        axios.get(`${this.state.serverUrl}/books?email=${this.state.userEmail}`).then(response => {
            console.log(response);
            this.setState({
                booksData: response.data[0].books,
            })
            // console.log(this.state.booksData.length);
        }).catch(
            error => {
                alert(error.message);
            }
        );
    }

    render() {
        return (
            <>
                {this.state.booksData.length &&

                    <Carousel id="carousel">{
                        this.state.booksData.map(value => {
                            return (
                                // <Card style={{ width: '18rem' , margin:'7px' }}>
                                //     <Card.Header>Books Data</Card.Header>
                                //     <ListGroup variant="flush">
                                //         <ListGroup.Item>Name : {value.name}</ListGroup.Item>
                                //         <ListGroup.Item>Description : {value.description}</ListGroup.Item>
                                //         <ListGroup.Item>Status :{value.status}</ListGroup.Item>
                                //     </ListGroup>
                                // </Card>



                                <Carousel.Item interval={1000}>
                                    <img
                                        className="d-block w-100"
                                        src={value.url}
                                        alt={value.name}
                                    />
                                    <Carousel.Caption id="carouselCaption">
                                        <h3>Name : {value.name}</h3>
                                        <p>Description : {value.description}</p>
                                        <p>Status: {value.status}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>

                            )
                        })
                    }
                    </Carousel>
                }
            </>
        )
    }
}

export default withAuth0(Books);