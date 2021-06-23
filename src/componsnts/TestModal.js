import React, { Component } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export class TestModal extends Component {

    constructor() {
        super()
        this.state = {
            showModal: false
        }
    }

    handleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {

        return (
            <>
                <Button onClick={() => { this.handleModal() }}>Open Modal</Button>
                
                <Modal size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={this.state.showModal} onHide={() => { this.handleModal() }} >
                    <Modal.Header closeButton>Head</Modal.Header>
                    <Modal.Body>
                        sadasdasdasdasd
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { this.handleModal() }}>
                            Close Modal
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default TestModal
