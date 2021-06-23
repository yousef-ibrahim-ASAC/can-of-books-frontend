import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
// import UpdateForm from './UpdateForm';

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';


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
            url: '',
            showModal: false,

            // showUpdateForm: false,
            // bookIndex: 0
        }
    }


    handleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

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


    // ************************************* Start POST *************************************

    updateBookName = (bookName) => {
        this.setState({ bookName });
        // console.log('bookName:',this.state.bookName);
    }
    updateBookdescribtion = (description) => {
        this.setState({ description });
        // console.log(this.state.description);
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

        this.handleModal();
    }

    // ************************************* End POST *************************************


    // ************************************* Start Put *************************************

    // to send a request for creating new data, we will be using the POST method

    // updateMyBook = (e) => {
    //     e.preventDefault();
    //     const reqBody = {
    //         booksData: this.state.catNameUpdate,
    //         userEmail: this.state.userEmail
    //     }


    //     axios.put(`${this.state.serverUrl}/book/${this.state.bookIndex}`, reqBody).then(response => {
    //         this.setState({
    //             booksData: response.data.books
    //         })
    //     }).catch(error =>
    //         alert(error.message)
    //     )
    // }


    // handleModalPut = () => {
    //     this.setState({
    //         showUpdateForm: !this.state.showUpdateForm
    //     })
    // }

    // ************************************* End Put *************************************

    // ************************************* Start Delete *************************************

    deleteMyBook = (index) => {
        // This function will be sending an axios request to the backend with the cat index to be deleted
        // NOTE! when deleting items with axios, axios does not accept request body assignment
        console.log(index);
        axios.delete(`${this.state.serverUrl}/book/${index}?email=${this.state.userEmail}`).then(response => {
            this.setState({
                booksData: response.data.books,
                // showUpdateForm: false
            });
            console.log(this.state.booksData);
        }).catch(error =>
            alert(error.message)
        )
    }

    // ************************************* End Delete *************************************


    render() {
        return (
            <Container>

                <div>
                    <Button variant="success" size="lg" onClick={() => { this.handleModal() }}>Add Book</Button>
                </div>
                <BookFormModal
                    updateBookName={this.updateBookName}
                    updateBookdescribtion={this.updateBookdescribtion}
                    updateBookstatus={this.updateBookstatus}
                    updateBookurl={this.updateBookurl}
                    createMyBook={this.createMyBook}

                    handleModal={this.handleModal}
                    showModal={this.state.showModal}
                />
                {this.state.booksData.length &&

                    <Carousel id="carousel">{
                        this.state.booksData.map((value, index) => {
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
                                        {/* <Button onClick={e => this.props.showUpdateForm(value, index)} >Show Update Form</Button> */}
                                        <Button variant="danger" onClick={e => this.deleteMyBook(index)} >Delete Book</Button>
                                    </Carousel.Caption>
                                </Carousel.Item>

                            )
                        })
                    }
                    </Carousel>
                }
            </Container>
        )
    }
}

export default withAuth0(Books);