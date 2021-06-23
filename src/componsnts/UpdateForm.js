import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export class UpdateForm extends Component {

    render() {
        return (
            <>
                <Modal size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.props.showUpdateForm} onHide={() => { this.props.handleModalPut() }} >
                    <Modal.Header closeButton>Update Book</Modal.Header>

                    <Modal.Body>



                        <Form onSubmit={(e) => this.props.updateMyBook(e)}>
                            <Form.Group className="mb-3" controlId="formBasicEmail" >
                                <Form.Label>Enter book name</Form.Label>
                                <Form.Control type="text" value={this.props.bookNameUpdate} required placeholder="Enter book" onChange={(e) => this.props.updatebookNameUpdateForm(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Write a discription book</Form.Label>
                                <Form.Control
                                value={this.props.descriptionUpdate}
                                    as="textarea" required
                                    placeholder="Write a discription here"
                                    style={{ height: '100px' }}
                                    onChange={(e) => this.props.updatedescriptionUpdateForm(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter the status of the book</Form.Label>
                                <Form.Control as="select" aria-label="Default select example" required onChange={(e) => this.props.updatestatusUpdateForm(e.target.value)} value={this.props.statusUpdate} >
                                    <option value="Available" >Available</option>
                                    <option value="Not-Availabe">Not Availabe</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Enter book URL image</Form.Label>
                                <Form.Control value={this.props.urlUpdate} type="text" placeholder="Enter book image URL" onChange={(e) => this.props.updateurlUpdateForm(e.target.value)} required />
                            </Form.Group>

                            <Button variant="success" type="submit">
                                Update
                            </Button>
                        </Form>



                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={() => { this.props.handleModalPut() }}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}



export default UpdateForm
