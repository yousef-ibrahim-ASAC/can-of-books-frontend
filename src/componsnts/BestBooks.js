import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';


class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: this.props.auth0.user.email,
            serverUrl: process.env.REACT_APP_SERVER_URL,
            booksData: [],
            bookName: '',
            description: '',
            status: '',
            url: ''
        }
    }

    // ************************************* Start POST *************************************

    updateBookName = (bookName) => {
        this.setState({ bookName });
        // console.log('bookName:',this.state.bookName);
    }
    updateBookdescribtion = (description) => {
        this.setState({ description });
        console.log(this.state.description);
    }
    updateBookstatus = (status) => {
        this.setState({ status });
        // console.log(this.state.status);
    }
    updateBookurl = (url) => {
        this.setState({ url });
        // console.log(this.state.url);
    }


    createMyBook = (e) => {
        e.preventDefault()

        const reqBody = {
            description: this.state.description,
            email: this.state.userEmail,
            bookName: this.state.bookName,
            status: this.state.status,
            url: this.state.url,
        }
        console.log(reqBody);
        axios.post(`${this.state.serverUrl}/book`, reqBody).then(response => {
            console.log(response.data.books);
            this.setState({
                booksData: response.data.books,
            })
        }).catch(error =>
            alert(error.message)
        )

    }

    // ************************************* End POST *************************************

    // ************************************* Start Get *************************************
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

    // ************************************* End Get *************************************

    // ************************************* Start Put *************************************



    // ************************************* End Put *************************************


    render() {
        return (
            <>
                <BookFormModal
                    updateBookName={this.updateBookName}
                    updateBookdescribtion={this.updateBookdescribtion}
                    updateBookstatus={this.updateBookstatus}
                    updateBookurl={this.updateBookurl}
                    createMyBook={this.createMyBook}
                />
                {this.state.booksData.length &&

                    <Carousel id="carousel">{
                        this.state.booksData.map(value => {
                            return (
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