import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.auth0.user.name,
            userEmail: this.props.auth0.user.email,
            userPicture: this.props.auth0.user.picture,
            serverUrl: process.env.REACT_APP_SERVER_URL,
            booksData: []
        }
    }


    //this is a react function that will execute once the component rendered
    componentDidMount = () => {

        axios.get(`http://localhost:8080/books?email=${this.state.userEmail}`).then(response => {
            console.log(response);
            this.setState({
                booksData: response.data[0].books,
            })
            console.log(this.state.booksData.length);
        }).catch(
            error => {
                alert(error.message);
            }
        );
    }

    render() {
        return (
            <>
                <p> {this.state.userEmail} </p>

                {this.state.booksData.length &&
                    this.state.booksData.map(value => {
                        return (
                              <p>{value.name}</p>
                        )
                    })
                }
            </>
        )
    }
}

export default withAuth0(Books);