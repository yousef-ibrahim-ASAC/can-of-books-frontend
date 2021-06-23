import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel';
import BookFormModal from './BookFormModal';
import UpdateForm from './UpdateForm';

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

            showUpdateForm: false,
            bookNameUpdate: '',
            descriptionUpdate: '',
            statusUpdate: '',
            urlUpdate: '',
            bookIndex: 0
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

    // bookNameUpdate: '',
    // descriptionUpdate: '',
    // statusUpdate: '',
    // urlUpdate: '',


    updatebookNameUpdateForm = (Update) => this.setState({ bookNameUpdate: Update });
    updatedescriptionUpdateForm = (Update) => this.setState({ descriptionUpdate: Update });
    updatestatusUpdateForm = (Update) => this.setState({ statusUpdate: Update });
    updateurlUpdateForm = (Update) => this.setState({ urlUpdate: Update });

    UpdateForm = (booksObject, idx) => {
        console.log(booksObject);
        this.setState({
            showUpdateForm: !this.state.showUpdateForm,
            bookNameUpdate: booksObject.name,
            descriptionUpdate: booksObject.description,
            statusUpdate: booksObject.status,
            urlUpdate: booksObject.url,
            bookIndex: idx
        })

        console.log(this.state.showUpdateForm);
        console.log(this.state.bookNameUpdate);
        console.log(this.state.descriptionUpdate);
    }

    // to send a request for creating new data, we will be using the POST method

    updateMyBook = (e) => {

        e.preventDefault();

        const reqBody = {
            bookName: this.state.bookNameUpdate,
            description: this.state.descriptionUpdate,
            status: this.state.statusUpdate,
            url: this.state.urlUpdate,
            email: this.state.userEmail
        }


        // axios.put(`${this.state.serverUrl}/book/${this.state.bookIndex}?email=${this.state.userEmail}&bookName=${this.state.bookNameUpdate}&description=${this.state.descriptionUpdate}&status=${this.state.statusUpdate}&url=${this.state.urlUpdate}`).then(response => {
        //     this.setState({
        //         booksData: response.data.books
        //     })
        // }).catch(error =>
        //     alert(error.message)
        // )

        axios.put(`${this.state.serverUrl}/book/${this.state.bookIndex}`, reqBody).then(response => {
            this.setState({
                booksData: response.data.books
            })
        }).catch(error =>
            alert(error.message)
        )
        this.handleModalPut();
    }


    handleModalPut = () => {
        this.setState({
            showUpdateForm: !this.state.showUpdateForm
        })
    }

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
            <>
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
                                            <Button onClick={e => this.UpdateForm(value, index)} >Show Update Form</Button>
                                            <Button variant="danger" onClick={e => this.deleteMyBook(index)} >Delete Book</Button>
                                        </Carousel.Caption>
                                    </Carousel.Item>

                                )
                            })
                        }
                        </Carousel>
                    }
                </Container>
                {
                    this.state.showUpdateForm &&
                    <UpdateForm

                        updatebookNameUpdateForm={this.updatebookNameUpdateForm}
                        updatedescriptionUpdateForm={this.updatedescriptionUpdateForm}
                        updatestatusUpdateForm={this.updatestatusUpdateForm}
                        updateurlUpdateForm={this.updateurlUpdateForm}

                        bookNameUpdate={this.state.bookNameUpdate}
                        descriptionUpdate={this.state.descriptionUpdate}
                        statusUpdate={this.state.statusUpdate}
                        urlUpdate={this.state.urlUpdate}

                        updateMyBook={this.updateMyBook}
                        showUpdateForm={this.state.showUpdateForm}
                        handleModalPut={this.handleModalPut}
                    />
                }
            </>
        )
    }
}

export default withAuth0(Books);