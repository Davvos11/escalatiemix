import {Component, FormEvent} from "react";
import {Button, Col, Form, FormControl, FormLabel, FormSelect, Modal, Row} from "react-bootstrap";
import {Container, containers} from "../config";
import {SHOTJE} from "./Containers";

type props = {
    onClose: (selected: Container) => void
    selected: Container
    toeterCount: number
}

type state = {
    show: boolean
    selected: Container
}

class Settings extends Component<props, state> {
    constructor(props: Readonly<props>) {
        super(props);

        this.state = {
            show: true,
            selected: props.selected,
        }
    }

    render() {
        const amount = this.props.toeterCount * SHOTJE / this.state.selected.capacity

        return (
            <Modal show={this.state.show} onHide={this.close} onExited={this.onClose}
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Kies glassoort</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormLabel className="fw-bold">Glas:</FormLabel>
                    <FormSelect size="lg" onChange={this.onChange}>
                        {containers.map((list, index) => {
                            return <option key={index} selected={list === this.props.selected}>{list.name}</option>
                        })}
                    </FormSelect>
                </Modal.Body>
                <Modal.Body>
                    <Row>
                        <Col><FormLabel column>Inhoud:</FormLabel></Col>
                        <Col><FormControl type="number" value={this.state.selected.capacity} readOnly /></Col>
                        <Col><FormLabel column>Aantal:</FormLabel></Col>
                        <Col><FormControl type="number" value={amount} readOnly/></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.close} >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private close = () => {
        this.setState({show: false})
        // this.props.onClose() will be called after the modal exited
    }

    private onClose = () => {
        this.props.onClose(this.state.selected)
    }

    private onChange = (event: FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.selectedIndex
        this.setState({selected: containers[value]})
    }
}

export default Settings
